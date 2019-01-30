import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ViewComponent } from 'src/app/views/view.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends ViewComponent {

  constructor(private _userService: UserService, private _modalService: NgbModal) {
    super(_userService);
  }

  public logout(): void {
    this._userService.signOut();
  }

  public openLoginModal(): void {
    this._modalService.open(LoginModalComponent);
  }

}
