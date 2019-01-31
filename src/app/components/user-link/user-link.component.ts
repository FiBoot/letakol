import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { FireStoreService } from 'src/app/services/firestore/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.css']
})
export class UserLinkComponent implements OnChanges {

  @Input() user: IUser;
  @Input() userId: string;
  @Input() light: boolean;

  constructor(private _firestore: FireStoreService, private _router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userId) {
      this._firestore.getItem<IUser>('users', this.userId).then(user => this.user = user);
    }
  }

  public get displayName() {
    return this.user ? this.user.data.displayName ? this.user.data.displayName : this.user.name : null;
  }

  public click(): void {
    if (this.user) {
      this._router.navigate(['/', 'user', this.user.id]);
    }
  }

}
