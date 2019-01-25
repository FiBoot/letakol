import { Component } from '@angular/core';
import { ViewComponent } from 'src/app/views/view.component';
import { ActivatedRoute } from '@angular/router';
import { FireStoreService } from 'src/app/services/firestore/firestore.service';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent extends ViewComponent {

  public list: Array<IUser>;

  constructor(userService: UserService, private _fireBaseService: FireStoreService) {
    super(userService);
    this._fireBaseService.getList<IUser>('users').then(data => this.list = data);
  }

}
