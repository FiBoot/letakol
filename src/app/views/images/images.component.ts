import { Component } from '@angular/core';
import { ViewComponent } from 'src/app/views/view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FireStoreService } from 'src/app/services/firestore/firestore.service';
import { IImage } from 'src/app/models/image.model';
import { StorageService } from 'src/app/services/upload/storage.service';
import { Mutex } from 'src/app/classes/mutex.class';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageUploadModalComponent } from 'src/app/components/image-upload-modal/image-upload-modal.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent extends ViewComponent {

  readonly IMAGE_PER_PAGE = 12;
  public mutex = new Mutex;

  public images: Array<IImage>;
  public displayedImages: Array<IImage>;
  public page = 1;

  public image: IImage;
  public id: string;

  constructor(route: ActivatedRoute, userService: UserService, private _router: Router, private _firestore: FireStoreService,
    private _storage: StorageService, private _modalService: NgbModal) {
    super(userService);

    this.id = route.snapshot.paramMap.get('id');
    if (this.id) {
      this._firestore.getItem<IImage>('images', this.id).then(image => this.image = image);
    } else {
      this.fetchData();
    }
  }

  private fetchData() {
    this._firestore.getList<IImage>('images').then(images => this.images = images);
  }

  public openModal(): void {
    this._modalService.open(ImageUploadModalComponent, { keyboard: false, backdrop: 'static' })
      .componentInstance.event.subscribe(result => this.fetchData());
  }

  public delete(image: IImage) {
    this.mutex.exec(this._storage.deleteImage.bind(this._storage), image).then(() => {
      if (!this.mutex.error) { this._router.navigate(['/', 'images']); }
    });
  }

  public pageChange(displayedImages: Array<IImage>): void {
    this.displayedImages = displayedImages;
  }

}
