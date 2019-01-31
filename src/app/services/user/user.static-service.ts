import { IUser } from 'src/app/models/user.model';


export class UserStaticService {

  private static _user: IUser = null;

  public static set user(user: IUser) {
    this._user = user;
  }

  public static get user(): IUser {
    return this._user;
  }

  public static get uid(): string {
    return this._user ? this._user.uid : null;
  }
}
