import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user.model';
import { Mutex } from 'src/app/classes/mutex.class';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnDestroy {
	private _userChangeSubscription: Subscription;
	public userForm = new FormGroup({
		displayName: new FormControl('', Validators.required),
		photoURL: new FormControl(),
	});
	public user: IUser;
	public mutex = new Mutex();

	constructor(private _userService: UserService, private router: Router) {
		this._userChangeSubscription = this._userService.userChange.subscribe((user) => {
			this.setUser(user);
      if (!user) {
        this.router.navigate(['/']);
      }
		});
		this.setUser(this._userService.user);
	}

	ngOnDestroy(): void {
		this._userChangeSubscription.unsubscribe();
	}

	private setUser(user: IUser | null): void {
		this.user = user;
		if (user) {
			this.userForm.setValue({
				displayName: user.data.displayName,
				photoURL: user.data.photoURL,
			});
		}
	}

	public update(form): void {
		this.mutex.exec(this._userService.updateProfile.bind(this._userService), form);
	}
}
