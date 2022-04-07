import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
	selector: 'app-user-link',
	templateUrl: './user-link.component.html',
	styleUrls: ['./user-link.component.css'],
})
export class UserLinkComponent implements OnChanges {
	@Input() user: IUser;
	@Input() userId: string;
	@Input() light: boolean;

	constructor(private _userService: UserService, private _router: Router) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.userId) {
			this._userService.getUser(this.userId).then((user) => (this.user = user));
		}
	}

	public get displayName() {
		return this.user ? (this.user.data.displayName ? this.user.data.displayName : this.user.name) : null;
	}

	public click(): void {
		if (this.user) {
			this._router.navigate(['/', 'user', this.user.id]);
		}
	}
}
