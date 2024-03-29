import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IFireBaseItem } from 'src/app/models/firebase-item.model';
import { Utils } from '../utils/utils.service';
import { UserStaticService } from '../user/user.static-service';
import { ItemPropertyError } from 'src/app/models/error/item-property-error.error';
import { ETables } from 'src/app/models/enums/firebase-tables.enum';
import { ECompare } from 'src/app/models/enums/firebase-compare.enum';
import { EItemTypes } from 'src/app/models/enums/firebase-item-types.enum';

@Injectable()
export class FireStoreService {
	readonly TABLE = ETables.Blob;
	readonly LIMIT = 1000;

	constructor(private _firestore: AngularFirestore) {}

	private format(item: IFireBaseItem): Object {
		const result = {};
		Object.keys(item).map((key) => (result[key] = item[key]));
		return result;
	}

	private itemTable(item: IFireBaseItem): string {
		return `${item.type}s`;
	}

	private getDoc(table: string, id: string, creation: boolean = false): Promise<AngularFirestoreDocument> {
		return new Promise<AngularFirestoreDocument>((resolve, reject) => {
			const doc = this._firestore.collection(table).doc(id);
			if (creation) {
				return resolve(doc);
			}
			doc
				.get()
				.toPromise()
				.then((documentSnapshot) => {
					if (documentSnapshot.exists) {
						resolve(doc);
					} else {
						reject(new Error(`${table}/${id} not found`));
					}
				});
		});
	}

	public checkItemProperty(item: IFireBaseItem, isUserItem: boolean = false): boolean {
		return UserStaticService.user && (isUserItem ? item.id : item.uid) === UserStaticService.user.id;
	}

	public getItem<T>(table: string, id: string): Promise<T> {
		return this.getDoc(table, id).then((doc) =>
			doc
				.get()
				.toPromise()
				.then((snapshot) => <T>snapshot.data())
		);
	}

	public getList<T>(table: string, orderBy: string = 'lastUpdateDate', limit: number = this.LIMIT): Promise<Array<T>> {
		return this._firestore
			.collection(table, (ref) => ref.orderBy(orderBy, 'desc').limit(limit))
			.get()
			.toPromise()
			.then((col) => col.docs.map((doc) => <T>doc.data()));
	}

	public search<T>(table: string, attribute: string, compare: ECompare, value: string | number): Promise<Array<T>> {
		return this._firestore
			.collection(table, (ref) => ref.where(attribute, compare, value))
			.get()
			.toPromise()
			.then((querySnapshot) => querySnapshot.docs.map((doc) => <T>doc.data()));
	}

	public searchOne<T>(table: string, attribute: string, compare: ECompare, value: string | number): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			this.search<T>(table, attribute, compare, value).then((result) => {
				if (result.length === 1) {
					resolve(result[0]);
				} else {
					reject(new Error(`No result for ${table}/${attribute} ${compare} '${value}'`));
				}
			});
		});
	}

	public count(
		table: string,
		attribute: string = null,
		compare: ECompare = null,
		value: string | number = null
	): Promise<number> {
		return this.search(table, attribute, compare, value).then((items) => items.length);
	}

	public add(item: IFireBaseItem): Promise<IFireBaseItem> {
		if (item.type !== EItemTypes.User && !UserStaticService.user) {
			return Promise.reject(new ItemPropertyError());
		}
		item.id = Utils.generateId();
		item.uid = item.type === EItemTypes.User ? item.id : UserStaticService.user.id;
		item.creationDate = Date.now();
		item.lastUpdateDate = item.creationDate;
		return Promise.all([
			this.getDoc(this.itemTable(item), item.id, true).then((doc) => doc.set(this.format(item))),
			this.getDoc(this.TABLE, item.id, true).then((doc) => doc.set(this.format(item))),
		]).then(() => Promise.resolve(item));
	}

	public update(item: IFireBaseItem): Promise<IFireBaseItem> {
		if (!this.checkItemProperty(item, item.type === EItemTypes.User)) {
			return Promise.reject(new ItemPropertyError());
		}
		item.lastUpdateDate = Date.now();
		return Promise.all([
			this.getDoc(this.itemTable(item), item.id).then((doc) => doc.update(this.format(item))),
			this.getDoc(this.TABLE, item.id).then((doc) => doc.update(this.format(item))),
		]).then(() => Promise.resolve(item));
	}

	public delete(item: IFireBaseItem): Promise<void> {
		if (!this.checkItemProperty(item)) {
			return Promise.reject(new ItemPropertyError());
		}
		return Promise.all([
			this.getDoc(this.itemTable(item), item.id).then((doc) => doc.delete()),
			this.getDoc(this.TABLE, item.id).then((doc) => doc.delete()),
		]).then(() => Promise.resolve());
	}
}
