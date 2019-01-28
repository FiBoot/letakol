import { Injectable } from '@angular/core';
import { IFireBaseItem, EItemType } from 'src/app/models/firebaseItem.model';
import { IImage, IImageData } from 'src/app/models/image.model';
import { IUser, IUserData } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ModelFactoryService {

  private static genereItem(name: string, data: Object, type: EItemType): IFireBaseItem {
    const date = Date.now();
    return <IFireBaseItem>{
      name: name,
      data: data,
      type: type,
      creationDate: date,
      lastUpdateDate: date,
      public: true
    };
  }

  public static generateUser(data: IUserData): IUser {
    return <IUser>this.genereItem(data.email, data, EItemType.User);
  }

  public static genereImage(data: IImageData): IImage {
    return <IImage>this.genereItem(data.name, data, EItemType.Image);
  }

}
