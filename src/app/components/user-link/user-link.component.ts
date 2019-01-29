import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { FireStoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.css']
})
export class UserLinkComponent implements OnChanges {

  @Input() user: IUser;
  @Input() userId: string;
  @Input() light: boolean;

  constructor(private _firestore: FireStoreService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userId) {
      this._firestore.getItem<IUser>('users', this.userId).then(user => this.user = user);
    }
  }

}
