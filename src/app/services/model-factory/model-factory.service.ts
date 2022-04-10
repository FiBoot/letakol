import { UserStaticService } from '../user/user.static-service';
import { Injectable } from '@angular/core';
import { IFireBaseItem } from 'src/app/models/firebase-item.model';
import { IImage, IImageData } from 'src/app/models/image.model';
import { IUser, IUserData } from 'src/app/models/user.model';
import { EItemTypes } from 'src/app/models/enums/firebase-item-types.enum';
import { IPixel, IPixelData } from 'src/app/models/pixel.model';

@Injectable({
	providedIn: 'root',
})
export class ModelFactoryService {
	private static generateItem(name: string, data: Object, type: EItemTypes, isPublic: boolean = true): IFireBaseItem {
		const date = Date.now();
		return <IFireBaseItem>{
			uid: UserStaticService.uid,
			name: name,
			data: data,
			type: type,
			creationDate: date,
			lastUpdateDate: date,
			public: isPublic,
		};
	}

	public static generateUser(data: IUserData): IUser {
		return {
			admin: false,
			...this.generateItem(data.email, data, EItemTypes.User),
		};
	}

	public static generateImage(data: IImageData, name: string = ''): IImage {
		return this.generateItem(name, data, EItemTypes.Image);
	}

	public static generatePixel(data: IPixelData, name: string = ''): IPixel {
		return this.generateItem(name, data, EItemTypes.Pixel);
	}
}
