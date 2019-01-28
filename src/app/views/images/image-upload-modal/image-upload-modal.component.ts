import { Component, Renderer, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { UploadStatus, StorageService } from 'src/app/services/upload/storage.service';
import { Utils } from 'src/app/services/utils/utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadEvent, FileSystemFileEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-image-upload-modal.component',
  templateUrl: './image-upload-modal.component.html',
  styleUrls: ['./image-upload-modal.component.css']
})
export class ImageUploadModalComponent {

  @ViewChild('imageFileInput') imageFileInput: ElementRef;

  readonly DEFAULT_TEXT = 'Drop File';
  private _file: File;
  public imageUploaded = new EventEmitter();
  public title: string;
  public status: UploadStatus;

  constructor(private _storage: StorageService, private renderer: Renderer, public modalService: NgbModal) {
    this.status = new UploadStatus(this.DEFAULT_TEXT);
  }

  public closeModal(): void {
    this.modalService.dismissAll();
  }

  public fileChange(event: Event): void {
    this.updateFile(Utils.first(Array.from((<HTMLInputElement>event.target).files)));

  }

  public fileDropped(event: UploadEvent): void {
    (<FileSystemFileEntry>Utils.first(event.files).fileEntry).file(file => this.updateFile(file));
  }

  public filedropClick(): void {
    this.renderer.invokeElementMethod(
      this.imageFileInput.nativeElement, 'dispatchEvent', [new MouseEvent('click', { bubbles: true })]
    );
  }

  public upload(): void {
    this.uploadFile(this._file, this.title);
    this._file = null;
    this.title = '';
  }


  private updateFile(file: File): void {
    this._file = file;
    this.status.message = `${file.name} (${Utils.fixed(file.size / 1000, 2)}Ko)`;
  }

  private async uploadFile(file: File, title: string = '') {
    this.status.message = 'Checking file';
    if (!this.status.inProgress && file) {
      this.status.message = 'Generating image preview';
      const preview = await this.genereImagePreview();
      this._storage.uploadImage(file, preview, title).subscribe(
        (newStatus) => this.status = newStatus,
        (err) => { },
        () => {
          this.status.inProgress = false;
          this.imageUploaded.emit();
        }
      );
    } else {
      this.status.message = 'Error while selecting file';
    }
  }

  private genereImagePreview(): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageHandle = new Image();
        imageHandle.src = (<FileReader>event.target).result.toString();
        imageHandle.onload = () => {
          resolve(this.resizeWithCanvas(imageHandle));
        };
      };
      reader.readAsDataURL(this._file);
    });
  }

  private resizeWithCanvas(image) {
    const DWIDTH = 200, DHEIGHT = 300;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = DWIDTH;
    canvas.height = DHEIGHT;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image,
      (image.width - DWIDTH) / 2, (image.height - DHEIGHT) / 2, DWIDTH, DHEIGHT,
      0, 0, DWIDTH, DHEIGHT,
    );

    return canvas.toDataURL('image/jpeg');
  }

}
