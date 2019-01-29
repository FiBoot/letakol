import { IFireBaseItem } from './firebaseItem.model';

export interface IUserData {
  uid: string;
  displayName: string;
  email: string;
  isAnonymous: boolean;
  photoURL: string;
}

export interface IUser extends IFireBaseItem {
  admin: boolean; // special property
  data: IUserData;
}
