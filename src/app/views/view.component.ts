import { UserService } from '../services/user/user.service';
import { IUser } from '../models/user.model';

export class ViewComponent {

  protected _currentUser: IUser = null;

  constructor(userService: UserService) {
    this._currentUser = userService.user;
    userService.userChange.subscribe(user => this._currentUser = user);
  }

  public get currentUser(): IUser { return this._currentUser; }

}
