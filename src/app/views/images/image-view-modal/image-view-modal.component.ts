import { ViewComponent } from './../../view.component';
import { FireStoreService } from './../../../services/firestore/firestore.service';
import { StorageService } from './../../../services/upload/storage.service';
import { Component, EventEmitter } from '@angular/core';
import { IImage } from 'src/app/models/image.model';
import { Mutex } from 'src/app/classes/mutex.class';
import { IUser } from 'src/app/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { Utils } from 'src/app/services/utils/utils.service';
import { ETables } from 'src/app/models/enums/firebase-tables.enum';

@Component({
  selector: 'app-image-view-modal',
  templateUrl: './image-view-modal.component.html',
  styleUrls: ['./image-view-modal.component.css']
})
export class ImageViewModalComponent extends ViewComponent {

  public mutex = new Mutex;
  public imageDeleted = new EventEmitter();
  public image: IImage;
  public user: IUser;

  constructor(userService: UserService, private _storage: StorageService,
    private _firestore: FireStoreService, private _modalService: NgbModal) {
    super(userService);
  }

  public setImage(image: IImage): void {
    this.image = image;
    this._firestore.getItem<IUser>(ETables.User, image.uid).then(user => this.user = user);
  }

  public convertDate(image: IImage): string {
    return Utils.timestampToLocaleDate(image.creationDate);
  }

  public openImage(image: IImage): void {
    window.open(image.data.url);
  }

  public closeModal(): void {
    this._modalService.dismissAll();
  }

  public delete(image: IImage): void {
    this.mutex.exec(this._storage.deleteImage.bind(this._storage), image)
      .then(() => {
        this.closeModal();
        this.imageDeleted.emit();
      });
  }

}
