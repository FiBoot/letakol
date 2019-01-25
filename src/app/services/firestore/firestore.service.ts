import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, QueryFn } from 'angularfire2/firestore';
import { IFireBaseItem, EItemType } from 'src/app/models/firebaseItem.model';
import { Utils } from '../utils/utils.service';
import { UserStaticService } from '../user/user.static-service';
import { ItemPropertyError } from 'src/app/models/error/item-property-error.error';

export enum ECompare {
  Equal = '==',
  Different = '!=',
  Inferior = '<',
  Superior = '>',
  InferiorEqual = '<=',
  SuperiorEqual = '>='
}

@Injectable()
export class FireStoreService {

  private readonly TABLE = 'blob';

  constructor(private _firestore: AngularFirestore) { }

  private format(item: IFireBaseItem): Object {
    const result = {};
    Object.keys(item).map(key => result[key] = item[key]);
    return result;
  }

  private itemTable(item: IFireBaseItem): string {
    return `${item.type}s`;
  }

  private getDoc(table: string, id: string, creation: boolean = false): Promise<AngularFirestoreDocument> {
    return new Promise<AngularFirestoreDocument>((resolve, reject) => {
      const doc = this._firestore.collection(table).doc(id);
      if (creation) { return resolve(doc); }
      doc.get().toPromise().then(documentSnapshot => {
        if (documentSnapshot.exists) {
          resolve(doc);
        } else {
          reject(new Error(`${table}/${id} not found`));
        }
      });
    });
  }

  // private genereUniqueId(): Promise<string> {
  //   return new Promise<string>(async (resolve, reject) => {
  //     let id: string, unique = false, tries = 0;
  //     do {
  //       id = Utils.generateId();
  //       unique = (await this.count(this.TABLE, 'id', CompareEnum.Equal, id)) === 0;
  //     } while (!unique && tries++ < environment.maxGenereIdTries);
  //     if (tries < environment.maxGenereIdTries) {
  //       resolve(id);
  //     } else {
  //       reject(new Error(`[genereUniqueId] max tries reached: ${environment.maxGenereIdTries}`));
  //     }
  //   });
  // }

  public checkItemProperty(item: IFireBaseItem, isUserItem: boolean = false): boolean {
    return UserStaticService.user && (isUserItem ? item.id : item.uid) === UserStaticService.user.id;
  }

  public getItem<T>(table: string, id: string): Promise<T> {
    return this.getDoc(table, id)
      .then(doc => doc.get().toPromise()
        .then(snapshot => <T>snapshot.data()));
  }

  public getList<T>(table: string): Promise<Array<T>> {
    return this._firestore.collection(table).get().toPromise()
      .then(col => col.docs.map(doc => <T>doc.data()));
  }

  public search<T>(table: string, attribute: string, compare: ECompare, value: string | number): Promise<Array<T>> {
    return (attribute
      ? this._firestore.collection(table, ref => ref.where(attribute, <firebase.firestore.WhereFilterOp>compare, value))
      : this._firestore.collection(table)).get().toPromise()
      .then(querySnapshot => querySnapshot.docs.map(doc => <T>doc.data()));
  }

  public searchOne<T>(table: string, attribute: string, compare: ECompare, value: string | number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.search<T>(table, attribute, compare, value).then(result => {
        if (result.length === 1) {
          resolve(result[0]);
        } else {
          reject(new Error(`No result for ${table}/${attribute} ${compare} '${value}'`));
        }
      });
    });
  }

  public count(table: string, attribute: string = null, compare: ECompare = null, value: string | number = null): Promise<number> {
    return this.search(table, attribute, compare, value).then(items => items.length);
  }

  public add(item: IFireBaseItem): Promise<IFireBaseItem> {
    if (item.type !== EItemType.User && !UserStaticService.user) { return Promise.reject(new ItemPropertyError); }
    item.uid = (item.type === EItemType.User) ? item.id : UserStaticService.user.id;
    item.id = Utils.generateId();
    return Promise.all([
      this.getDoc(this.itemTable(item), item.id, true).then(doc => doc.set(this.format(item))),
      this.getDoc(this.TABLE, item.id, true).then(doc => doc.set(this.format(item))),
    ]).then(() => Promise.resolve(item));
  }

  public update(item: IFireBaseItem): Promise<IFireBaseItem> {
    if (!this.checkItemProperty(item, item.type === EItemType.User)) { return Promise.reject(new ItemPropertyError); }
    item.lastUpdateDate = new Date;
    return Promise.all([
      this.getDoc(this.itemTable(item), item.id).then(doc => doc.update(this.format(item))),
      this.getDoc(this.TABLE, item.id).then(doc => doc.update(this.format(item))),
    ]).then(() => Promise.resolve(item));
  }

  public delete(item: IFireBaseItem): Promise<void> {
    if (!this.checkItemProperty(item)) { return Promise.reject(new ItemPropertyError); }
    return Promise.all([
      this.getDoc(this.itemTable(item), item.id).then(doc => doc.delete()),
      this.getDoc(this.TABLE, item.id).then(doc => doc.delete()),
    ]).then(() => Promise.resolve());
  }

}
