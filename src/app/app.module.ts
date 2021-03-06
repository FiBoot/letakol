import { ROUTES } from './app.routes';
import { ComponentsModule } from './components/components.module';
import { ImageUploadModalComponent } from './views/images/image-upload-modal/image-upload-modal.component';
import { ImageViewModalComponent } from './views/images/image-view-modal/image-view-modal.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FIREBASE_CONFIG } from 'src/environments/firebase.token';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FileDropModule } from 'ngx-file-drop';

import { AppComponent } from './app.component';
import { AppsModule } from './apps/apps.modules';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { LoginModalComponent } from './components/header/login-modal/login-modal.component';
import { FireStoreService } from './services/firestore/firestore.service';
import { AdminComponent } from './views/admin/admin.component';
import { DefaultComponent } from './views/default/default.component';
import { ImagesComponent } from './views/images/images.component';
import { ListViewComponent } from './views/list-view/list-view.component';
import { TimelineComponent } from './views/timeline/timeline.component';
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
    TimelineComponent,
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
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgbModule,
    FileDropModule,
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
