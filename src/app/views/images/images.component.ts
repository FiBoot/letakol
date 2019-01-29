import { Component, AfterViewInit } from '@angular/core';
import { ViewComponent } from 'src/app/views/view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FireStoreService } from 'src/app/services/firestore/firestore.service';
import { IImage } from 'src/app/models/image.model';
import { UserService } from 'src/app/services/user/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageUploadModalComponent } from './image-upload-modal/image-upload-modal.component';
import { ImageViewModalComponent } from './image-view-modal/image-view-modal.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent extends ViewComponent implements AfterViewInit {

  public images: Array<IImage>;
  public displayedImages: Array<IImage>;
  public page = 1;

  public image: IImage;

  constructor(userService: UserService, private _route: ActivatedRoute,
    private _firestore: FireStoreService, private _modalService: NgbModal) {
    super(userService);
  }

  ngAfterViewInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.fetchData().then(images => {
      const image = images.find(i => i.id === id);
      if (image) { this.openImageModal(image); }
    });
  }

  private fetchData(): Promise<Array<IImage>> {
    return this._firestore.getList<IImage>('images').then(images => this.images = images);
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

}
