import { ItemDateComponent } from './components/item-date/item-date.component';
import { ImageViewModalComponent } from './views/images/image-view-modal/image-view-modal.component';
import { ImageUploadModalComponent } from './views/images/image-upload-modal/image-upload-modal.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routes } from './app.routes.module';
import { FIREBASE_CONFIG } from 'src/environments/firebase.token';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { CodemirrorModule } from 'ng2-codemirror';
import { FileDropModule } from 'ngx-file-drop';

import { AppComponent } from './app.component';
import { DefaultComponent } from './views/default/default.component';
import { HeaderComponent } from './components/header/header.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { ChatComponent } from './apps/chat/chat.component';
import { ChatRoomComponent } from './apps/chat-room/chat-room.component';
import { MemoryComponent } from './apps/memory/memory.component';
import { NumGridComponent } from './apps/num-grid/num-grid.component';
import { SnakeIoComponent } from './apps/snake-io/snake-io.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { UserViewComponent } from './views/user-view/user-view.component';
import { UserLinkComponent } from './components/user-link/user-link.component';
import { FireStoreService } from './services/firestore/firestore.service';
import { ListViewComponent } from './views/list-view/list-view.component';
import { UserEditComponent } from './views/user-edit/user-edit.component';
import { PetComponent } from './apps/pet/pet.component';
import { CodewarComponent } from './apps/codewar/codewar.component';
import { AdminComponent } from './views/admin/admin.component';
import { ImagesComponent } from './views/images/images.component';
import { MutexButtonComponent } from './components/mutex-button/mutex-button.component';
import { PaginationComponent } from './components/pagination/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { ItemComponent } from './components/item/item.component';


@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    LoginModalComponent,
    InputFormComponent,
    LoaderComponent,
    UserLinkComponent,
    MutexButtonComponent,
    PaginationComponent,

    DefaultComponent,
    AdminComponent,
    UserViewComponent,
    ListViewComponent,
    UserEditComponent,
    ImagesComponent,
    ImageViewModalComponent,
    ImageUploadModalComponent,

    ChatComponent,
    ChatRoomComponent,
    MemoryComponent,
    NumGridComponent,
    SnakeIoComponent,
    PetComponent,
    CodewarComponent,
    ItemDateComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    CodemirrorModule,
    FileDropModule
  ],
  exports: [
    HeaderComponent,
    LoginModalComponent,
    InputFormComponent,
    LoaderComponent
  ],
  entryComponents: [
    ImageViewModalComponent,
    ImageUploadModalComponent
  ],
  providers: [FireStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
