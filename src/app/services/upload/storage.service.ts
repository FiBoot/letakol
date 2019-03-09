import { Injectable } from '@angular/core';
import { FireStoreService } from '../firestore/firestore.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable, Subscriber } from 'rxjs';
import { ModelFactoryService } from '../model-factory/model-factory.service';
import { Timer } from 'src/app/classes/timer.class';
import { Utils } from '../utils/utils.service';
import { IImage } from 'src/app/models/image.model';
import { ItemPropertyError } from 'src/app/models/error/item-property-error.error';

export class UploadStatus {
  inProgress = false;
  message: string;
  percent = 0;
  constructor(message: string = '') {
    this.message = message;
  }
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _status: UploadStatus;

  constructor(private _firestore: FireStoreService, private _storage: AngularFireStorage) { }

  private updateMessage(message: string, observer: Subscriber<UploadStatus>): void {
    this._status.message = message;
    observer.next(this._status);
  }

  public uploadImage(file: File, preview: string, title: string = ''): Observable<UploadStatus> {
    return new Observable(observer => {
      this._status = new UploadStatus;
      const timer = new Timer('Upload');
      const fileId = Utils.generateId();

      timer.start();
      this._status.inProgress = true;

      this.updateMessage('Uploading file...', observer);
      const uploadTask = this._storage.upload(`images/${fileId}`, file);

      uploadTask.percentageChanges().subscribe(percent => {
        this._status.percent = percent = Utils.fixed(percent, 2);
        this.updateMessage(`Uploading file... (${percent}% ${timer.value}sec)`, observer);
      });

      uploadTask.then((uploadTaskSnapshot: firebase.storage.UploadTaskSnapshot) => {

        this.updateMessage('Updating download url', observer);
        uploadTaskSnapshot.ref.getDownloadURL().then(url => {

          this.updateMessage('Creating base entry', observer);
          const item = ModelFactoryService.genereImage({
            fileId: fileId,
            url: url,
            preview: preview
          }, title);

          this._firestore.add(item).then(image => {
            timer.stop();
            this._status.inProgress = false;
            this.updateMessage(`File successfully uploaded in ${timer.value}sec`, observer);
            observer.complete();
          });
        });
      });

      uploadTask.catch(err => {
        this._status.inProgress = false;
        this.updateMessage(err.message, observer);
      });
    });
  }

  public deleteImage(image: IImage): Promise<void> {
    if (!this._firestore.checkItemProperty(image)) {
      return Promise.reject(new ItemPropertyError);
    }
    return this._storage.storage.refFromURL(image.data.url).delete().then(() => this._firestore.delete(image));
  }
}
