import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ViewComponent } from 'src/app/views/view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FireStoreService } from 'src/app/services/firestore/firestore.service';
import { IUser } from 'src/app/models/user.model';
import { IFireBaseItem } from 'src/app/models/firebase-item.model';
import { ECompare } from 'src/app/models/enums/firebase-compare.enum';
import { ETables } from 'src/app/models/enums/firebase-tables.enum';

@Component({
	selector: 'app-user-view',
	templateUrl: './user-view.component.html',
	styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent extends ViewComponent {
	public user: IUser;
	public items: Array<IFireBaseItem>;
	public displayItems: Array<IFireBaseItem>;

	constructor(userService: UserService, activatedRoute: ActivatedRoute, router: Router, firestore: FireStoreService) {
		super(userService);

		activatedRoute.params.subscribe((p) => {
			firestore
				.getItem<IUser>(ETables.Users, p.id)
				.then((user) => (this.user = user))
				.catch((reason) => router.navigate(['/']));
			firestore
				.search<IFireBaseItem>(ETables.Blob, 'uid', ECompare.Equal, p.id)
				.then((result) => (this.items = result));
		});
	}
}
