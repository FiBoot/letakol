import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FirebaseOperation } from '@angular/fire/database/interfaces';
import { IFireBaseItem } from 'src/app/models/firebase-item.model';

@Injectable()
export class RealtimeFirebaseService {
	constructor(private _realtimeFirebase: AngularFireDatabase) {}

	public getListRef(listName: string): AngularFireList<IFireBaseItem> {
		return this._realtimeFirebase.list<IFireBaseItem>(listName);
	}

	public pushNewItem(listRef: AngularFireList<IFireBaseItem>, item: IFireBaseItem): Promise<void> {
		return listRef.push(item).then((ref) => listRef.update(ref.key, { id: ref.key }));
	}

	public updateItem(
		listRef: AngularFireList<IFireBaseItem>,
		itemRef: FirebaseOperation,
		data: Partial<IFireBaseItem>
	): Promise<void> {
		return listRef.update(itemRef, data);
	}

	public removeItem(listRef: AngularFireList<IFireBaseItem>, itemRef: FirebaseOperation): Promise<void> {
		return listRef.remove(itemRef);
	}
}
