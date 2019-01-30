import { Component } from '@angular/core';
import { IFireBaseItem } from 'src/app/models/firebaseItem.model';
import { FireStoreService } from 'src/app/services/firestore/firestore.service';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent {

  public items: Array<IFireBaseItem>;
  public displayedItems: Array<IFireBaseItem>;
  public search: string;
  public page = 1;

  constructor(private _firestore: FireStoreService) {
    this._firestore.getList<IFireBaseItem>(this._firestore.TABLE, 'lastUpdateDate').then(result => this.items = result);
  }
}
