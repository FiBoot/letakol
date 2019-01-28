import { Component } from '@angular/core';
import { ViewComponent } from 'src/app/views/view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FireStoreService } from 'src/app/services/firestore/firestore.service';
import { IImage } from 'src/app/models/image.model';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageUploadModalComponent } from './image-upload-modal/image-upload-modal.component';
import { ImageViewModalComponent } from './image-view-modal/image-view-modal.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent extends ViewComponent {

  readonly IMAGE_PER_PAGE = 12;

  public images: Array<IImage>;
  public displayedImages: Array<IImage>;
  public page = 1;

  public image: IImage;
  public id: string;

  constructor(route: ActivatedRoute, userService: UserService, private _firestore: FireStoreService, private _modalService: NgbModal) {
    super(userService);

    this.id = route.snapshot.paramMap.get('id');
    this.fetchData();
  }

  private fetchData() {
    this._firestore.getList<IImage>('images').then(images => this.images = images);
  }

  public openUploadModal(): void {
    this._modalService.open(ImageUploadModalComponent, { keyboard: false, backdrop: 'static' })
      .componentInstance.imageUploaded.subscribe(() => this.fetchData());
  }

  public openImageModal(image: IImage): void {
    const componentInstance = this._modalService.open(ImageViewModalComponent, { size: 'lg' }).componentInstance;
    componentInstance.imageDeleted.subscribe(() => this.fetchData());
    componentInstance.setImage(image);
  }

  public pageChange(displayedImages: Array<IImage>): void {
    this.displayedImages = displayedImages;
  }

}
