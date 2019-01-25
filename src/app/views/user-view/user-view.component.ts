import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Mutex } from 'src/app/classes/mutex.class';
import { ViewComponent } from 'src/app/views/view.component';
import { ActivatedRoute } from '@angular/router';
import { FireStoreService } from 'src/app/services/firestore/firestore.service';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent extends ViewComponent {

  public user: IUser;
  public mutex = new Mutex;

  constructor(router: ActivatedRoute, userService: UserService, firestore: FireStoreService) {
    super(userService);
    firestore.getItem<IUser>('users', router.snapshot.paramMap.get('id')).then(user => this.user = user);
  }

}
