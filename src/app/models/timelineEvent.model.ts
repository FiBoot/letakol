import { IFireBaseItem } from './firebaseItem.model';

export interface ITimelineEventData {
  startDate: number;
  endDate: number;
}

export interface ITimelineEvent extends IFireBaseItem {
  data: ITimelineEventData;
}
