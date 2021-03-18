import { ROUTES } from './app.routes';
import { ComponentsModule } from './components/components.module';
import { ImageUploadModalComponent } from './views/images/image-upload-modal/image-upload-modal.component';
import { ImageViewModalComponent } from './views/images/image-view-modal/image-view-modal.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FIREBASE_CONFIG } from 'src/environments/firebase.token';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxFileDropModule } from 'ngx-file-drop';

import { AppComponent } from './app.component';
import { AppsModule } from './apps/apps.modules';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { LoginModalComponent } from './components/header/login-modal/login-modal.component';
import { FireStoreService } from './services/firestore/firestore.service';
import { AdminComponent } from './views/admin/admin.component';
import { DefaultComponent } from './views/default/default.component';
import { ImagesComponent } from './views/images/images.component';
import { ListViewComponent } from './views/list-view/list-view.component';
import { UserEditComponent } from './views/user-edit/user-edit.component';
import { UserViewComponent } from './views/user-view/user-view.component';
import { RouterModule } from '@angular/router';
import { VoidStonesComponent } from './apps/void-stones/void-stones.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    AdminComponent,
    UserViewComponent,
    ListViewComponent,
    UserEditComponent,
    ImagesComponent,
    ImageViewModalComponent,
    ImageUploadModalComponent,
    VoidStonesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    // AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgbModule,
    NgxFileDropModule,
    ComponentsModule,
    AppsModule
  ],
  entryComponents: [
    ConfirmModalComponent,
    LoginModalComponent,
    ImageViewModalComponent,
    ImageUploadModalComponent
  ],
  providers: [FireStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
