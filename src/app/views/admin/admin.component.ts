import { Component, AfterViewInit } from '@angular/core';
import { IFireBaseItem, EItemType } from 'src/app/models/firebaseItem.model';
import { Mutex } from 'src/app/classes/mutex.class';
import { ViewComponent } from '../view.component';
import { UserService } from 'src/app/services/user/user.service';
import { FireStoreService } from 'src/app/services/firestore/firestore.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { IUser } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent extends ViewComponent {

  public items: Array<IFireBaseItem>;
  public displayedItems: Array<IFireBaseItem>;
  public mutex = new Mutex;
  public sortBy = 'lud';

  constructor(userService: UserService, private _firestore: FireStoreService, private _router: Router) {
    super(userService);
    this.fetchData();
  }

  public fetchData(): void {
    this._firestore.getList<IFireBaseItem>(this._firestore.TABLE).then(items => {
      this.items = items;
      this.sort(this.sortBy);
    });
  }

  public sort(by: string): void {
    const items = this.items.slice();
    this.sortBy = by;
    switch (by) {
      case 'uid': items.sort((a, b) => (a.type === EItemType.User ? a.id.localeCompare(b.id) : a.uid.localeCompare(b.uid))); break;
      case 'name': items.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'type': items.sort((a, b) => a.type.localeCompare(b.type)); break;
      case 'cd': items.sort((a, b) => a.creationDate - b.creationDate); break;
      case 'lud': items.sort((a, b) => a.lastUpdateDate - b.lastUpdateDate); break;
      default: this.sort = null;
    }
    this.items = items;
  }

  public goTo(item: IFireBaseItem): void {
    this._router.navigate(['/', item.type, item.id]);
  }

}
