import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ViewComponent } from 'src/app/views/view.component';
import { ActivatedRoute } from '@angular/router';
import { FireStoreService, ECompare } from 'src/app/services/firestore/firestore.service';
import { IUser } from 'src/app/models/user.model';
import { IFireBaseItem } from 'src/app/models/firebaseItem.model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent extends ViewComponent {

  public user: IUser;
  public items: Array<IFireBaseItem>;
  public displayItems: Array<IFireBaseItem>;

  constructor(userService: UserService, activatedRoute: ActivatedRoute, firestore: FireStoreService) {
    super(userService);

    activatedRoute.params.subscribe(p => {
      firestore.getItem<IUser>('users', p.id).then(user => this.user = user);
      firestore.search<IFireBaseItem>('blob', 'uid', ECompare.Equal, p.id).then(result => this.items = result);
    });
  }

}
