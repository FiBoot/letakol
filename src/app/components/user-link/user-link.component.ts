import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.css']
})
export class UserLinkComponent {

  @Input() user: IUser;
  @Input() light: boolean;

}
