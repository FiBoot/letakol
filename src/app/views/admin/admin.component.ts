import { Component, AfterViewInit } from '@angular/core';
import { IFireBaseItem, EItemType } from 'src/app/models/firebaseItem.model';
import { Mutex } from 'src/app/classes/mutex.class';
import { ViewComponent } from '../view.component';
import { UserService } from 'src/app/services/user/user.service';
import { FireStoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent extends ViewComponent {

  public items: Array<IFireBaseItem>;
  public displayedItems: Array<IFireBaseItem>;
  public mutex = new Mutex;

  constructor(userService: UserService, private _firestore: FireStoreService) {
    super(userService);
    this.fetchData();
  }

  public fetchData(): void {
    this._firestore.getList<IFireBaseItem>('blob').then(items => this.items = items);
  }

  public pageChange(displayedItems: Array<IFireBaseItem>): void {
    this.displayedItems = displayedItems;
  }

  public sort(by: string): void {
    const items = this.items.slice();
    switch (by) {
      case 'uid': items.sort((a, b) => (a.type === EItemType.User ? a.id.localeCompare(b.id) : a.uid.localeCompare(b.uid))); break;
      case 'name': items.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'type': items.sort((a, b) => a.type.localeCompare(b.type)); break;
      case 'cd': items.sort((a, b) => a.creationDate - b.creationDate); break;
      case 'lud': items.sort((a, b) => a.lastUpdateDate - b.lastUpdateDate); break;
    }
    this.items = items;
  }

  public delete(item: IFireBaseItem): void {
    console.log(item);
  }

}
