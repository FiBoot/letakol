import { Component, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Mutex } from 'src/app/classes/mutex.class';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnDestroy {
	private _userChangeSubscription: Subscription;
	public loginForm = new FormGroup({
		email: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
	});
	public mutex = new Mutex(false);

	constructor(private _userService: UserService, private _modalService: NgbModal) {
		this._userChangeSubscription = this._userService.userChange.subscribe((user) => {
			if (user) {
				this._modalService.dismissAll();
			}
		});
	}

	ngOnDestroy(): void {
		this._userChangeSubscription.unsubscribe();
	}

	public register(form): void {
		this.mutex.exec(this._userService.register.bind(this._userService), form);
	}

	public login(form): void {
		this.mutex.exec(this._userService.signIn.bind(this._userService), form);
	}

	public googleLogin(): void {
		this.mutex.exec(this._userService.signInWithGoogle.bind(this._userService));
	}

	public close(): void {
		this._modalService.dismissAll();
	}
}
