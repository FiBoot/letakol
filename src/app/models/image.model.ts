import { IFireBaseItem } from './firebaseItem.model';

export interface IImageData {
  url: string;
  fileId: string;
  name: string;
  preview: string;
}

export interface IImage extends IFireBaseItem {
  data: IImageData;
}
