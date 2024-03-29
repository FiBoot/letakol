import { EPixelColors } from './enums/pixel-war-colors.enum';
import { IFireBaseItem } from './firebase-item.model';

export interface IPixelData {
    posX: number;
    posY: number;
    color: EPixelColors;
}

export interface IPixel extends IFireBaseItem {
  data: IPixelData;
}
