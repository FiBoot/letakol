import { EItemTypes } from './enums/firebase-item-types.enum';

export interface IFireBaseItem {
	id: string;
	uid: string;
	name: string;
	type: EItemTypes;
	data: any;
	creationDate: number;
	lastUpdateDate: number;
	public: boolean;
}
