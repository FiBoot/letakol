import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { DisplayObjectComponent } from './display-object/display-object.component';
import { HeaderComponent } from './header/header.component';
import { LoginModalComponent } from './header/login-modal/login-modal.component';
import { InputFormComponent } from './input-form/input-form.component';
import { ItemDateComponent } from './item-date/item-date.component';
import { ItemComponent } from './item/item.component';
import { LoaderComponent } from './loader/loader.component';
import { MutexButtonComponent } from './mutex-button/mutex-button.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ScreensaverComponent } from './screensaver/screensaver.component';
import { ScreensaverDirective } from './screensaver/screensaver.directive';
import { UserLinkComponent } from './user-link/user-link.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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
    ItemComponent,
    ScreensaverComponent,
    ScreensaverDirective,
    DisplayObjectComponent
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
    ItemComponent,
    ScreensaverDirective,
    DisplayObjectComponent
  ],
  imports: [RouterModule, BrowserModule, FormsModule, ReactiveFormsModule],
  entryComponents: [ScreensaverComponent]
})
export class ComponentsModule {}
