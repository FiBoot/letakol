import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ItemComponent } from './item/item.component';
import { ItemDateComponent } from './item-date/item-date.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { MutexButtonComponent } from './mutex-button/mutex-button.component';
import { UserLinkComponent } from './user-link/user-link.component';
import { LoaderComponent } from './loader/loader.component';
import { InputFormComponent } from './input-form/input-form.component';
import { LoginModalComponent } from './header/login-modal/login-modal.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginModalComponent,
    InputFormComponent,
    LoaderComponent,
    UserLinkComponent,
    MutexButtonComponent,
    PaginationComponent,
    ConfirmModalComponent,
    ItemDateComponent,
    ItemComponent
  ],
  exports: [
    HeaderComponent,
    LoginModalComponent,
    InputFormComponent,
    LoaderComponent,
    UserLinkComponent,
    MutexButtonComponent,
    PaginationComponent,
    ConfirmModalComponent,
    ItemDateComponent,
    ItemComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule {}
