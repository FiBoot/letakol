
export enum EItemType {
  User = 'user',
  Image = 'image',
}

export interface IFireBaseItem {
  id: string;
  uid: string;
  name: string;
  type: EItemType;
  data: any;
  creationDate: number;
  lastUpdateDate: number;
  public: boolean;
}
