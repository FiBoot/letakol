import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ViewComponent } from 'src/app/views/view.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends ViewComponent {

  constructor(private _userService: UserService) {
    super(_userService);
  }

  public logout(): void {
    this._userService.signOut();
  }

}
