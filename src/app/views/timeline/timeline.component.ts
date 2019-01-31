import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as vis from 'vis';
import { ITimelineEvent } from 'src/app/models/timelineEvent.model';
import { ModelFactoryService } from 'src/app/services/model-factory/model-factory.service';
import { Utils } from 'src/app/services/utils/utils.service';
import { Mutex } from 'src/app/classes/mutex.class';
import { FireStoreService } from 'src/app/services/firestore/firestore.service';
import { EItemType } from 'src/app/models/firebaseItem.model';

enum ETimelineType {
  Point = 'box',
  Duration = 'range'
}

class TimelineItem implements vis.DataItem {
  className?: string;
  content: string;
  end?: vis.DateType;
  group?: any;
  id?: vis.IdType;
  start: vis.DateType;
  style?: string;
  subgroup?: vis.IdType;
  title?: string;
  type?: string;
  editable?: boolean;

  event: ITimelineEvent;
  saved: boolean;

  constructor(event: ITimelineEvent, editable: boolean = false, saved: boolean = false) {
    this.id = event.id;
    this.group = event.uid;
    this.content = event.name;
    this.title = event.name;
    this.start = new Date(event.data.startDate);
    this.end = event.data.endDate ? new Date(event.data.endDate) : null;
    this.type = event.data.endDate ? ETimelineType.Duration : ETimelineType.Point;
    this.editable = editable;

    this.event = event;
    this.saved = saved;
  }
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {

  @ViewChild('visTimeline') visTimeline: ElementRef;

  private timeline: vis.Timeline;
  private items: Array<TimelineItem>;
  public selectedItem: TimelineItem;

  public mutex = new Mutex;

  constructor(private _firestore: FireStoreService) {
    this._firestore.getList<ITimelineEvent>(`${EItemType.TimelineEvent}s`)
      .then(result => {
        this.items = result.map(item => new TimelineItem(item));
        this.initTimeline();
      });
  }

  initTimeline(): void {
    console.log(this.visTimeline, this.items);
    this.timeline = new vis.Timeline(this.visTimeline.nativeElement, new vis.DataSet(this.items), {});
    // Events:
    this.timeline.on('click', (event) => {
      this.selectedItem = event.item ? this.items.find(item => item.id === event.item) : null;
    });
  }

  public addItem(): void {
    const timelineEvent = ModelFactoryService.genereTimelineEvent({
      startDate: Date.now(),
      endDate: null
    }, 'New Event');
    this.items.push(new TimelineItem(timelineEvent, true, false));
    this.timeline.setItems(new vis.DataSet(this.items));
    this.timeline.setSelection(Utils.last(this.items).id);
  }

  public saveItem(): void {
    if (this.selectedItem) {
      this.mutex.exec(
        (this.selectedItem.event.id ? this._firestore.update : this._firestore.add).bind(this._firestore),
        this.selectedItem.event
      ).then(() => this.selectedItem.saved = true);
    }
  }

}
