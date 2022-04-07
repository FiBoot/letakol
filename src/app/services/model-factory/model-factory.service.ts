import { UserStaticService } from '../user/user.static-service';
import { Injectable } from '@angular/core';
import { IFireBaseItem } from 'src/app/models/firebaseItem.model';
import { IImage, IImageData } from 'src/app/models/image.model';
import { IUser, IUserData } from 'src/app/models/user.model';
import { EItemTypes } from 'src/app/models/enums/firebase-item-types.enum';

@Injectable({
	providedIn: 'root',
})
export class ModelFactoryService {
	private static genereItem(name: string, data: Object, type: EItemTypes): IFireBaseItem {
		const date = Date.now();
		return <IFireBaseItem>{
			uid: UserStaticService.uid,
			name: name,
			data: data,
			type: type,
			creationDate: date,
			lastUpdateDate: date,
			public: true,
		};
	}

	public static generateUser(data: IUserData): IUser {
		return <IUser>this.genereItem(data.email, data, EItemTypes.User);
	}

	public static genereImage(data: IImageData, name: string = ''): IImage {
		return <IImage>this.genereItem(name, data, EItemTypes.Image);
	}
}
