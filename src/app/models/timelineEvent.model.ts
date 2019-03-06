import { IFireBaseItem } from './firebaseItem.model';

export interface ITimelineEventData {
  title: string;
  startDate: number;
  endDate: number;
}

export interface ITimelineEvent extends IFireBaseItem {
  data: ITimelineEventData;
}
