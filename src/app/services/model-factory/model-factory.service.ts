import { Injectable } from '@angular/core';
import { IFireBaseItem, EItemType } from 'src/app/models/firebaseItem.model';
import { IImage, IImageData } from 'src/app/models/image.model';
import { IUser, IUserData } from 'src/app/models/user.model';
import { ITimelineEventData, ITimelineEvent } from 'src/app/models/timelineevent.model';
import { Utils } from '../utils/utils.service';
import { UserStaticService } from '../user/user.static-service';

@Injectable({
  providedIn: 'root'
})
export class ModelFactoryService {

  private static genereItem(name: string, data: Object, type: EItemType): IFireBaseItem {
    const date = Date.now();
    return <IFireBaseItem>{
      uid: UserStaticService.uid,
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

  public static genereImage(data: IImageData, name: string = ''): IImage {
    return <IImage>this.genereItem(name, data, EItemType.Image);
  }

  public static genereTimelineEvent(data: ITimelineEventData, name: string = ''): ITimelineEvent {
    return <ITimelineEvent>this.genereItem(name, data, EItemType.TimelineEvent);
  }

}
