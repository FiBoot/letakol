import { IFireBaseItem } from './firebase-item.model';

export interface IImageData {
  url: string;
  fileId: string;
  preview: string;
}

export interface IImage extends IFireBaseItem {
  data: IImageData;
}
