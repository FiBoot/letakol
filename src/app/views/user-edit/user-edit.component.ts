import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user.model';
import { Mutex } from 'src/app/classes/mutex.class';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {

  public userForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    photoURL: new FormControl()
  });
  public user: IUser;
  public mutex = new Mutex;

  constructor(private _userService: UserService) {
    this._userService.userChange.subscribe(user => this.setUser(user));
    this.setUser(this._userService.user);
  }

  private setUser(user: IUser): void {
    this.user = user;
    if (user) {
      this.userForm.setValue({
        displayName: user.data.displayName,
        photoURL: user.data.photoURL
      });
    }
  }

  public update(form): void {
    this.mutex.exec(this._userService.updateProfile.bind(this._userService), form);
  }

}
