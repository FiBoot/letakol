import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ITimelineEvent } from 'src/app/models/timelineEvent.model';
import { ModelFactoryService } from 'src/app/services/model-factory/model-factory.service';
import { Mutex } from 'src/app/classes/mutex.class';
import { FireStoreService } from 'src/app/services/firestore/firestore.service';
import { EItemType } from 'src/app/models/firebaseItem.model';
import { ViewComponent } from '../view.component';
import { UserService } from 'src/app/services/user/user.service';
import { UserStaticService } from 'src/app/services/user/user.static-service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as vis from 'vis';

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
  synchronised: boolean;

  constructor(event: ITimelineEvent, editable: boolean = false, synchronised: boolean = true) {
    this.id = event.id;
    this.group = event.uid;
    this.content = event.data.title;
    this.title = event.name;
    this.start = new Date(event.data.startDate);
    this.end = event.data.endDate ? new Date(event.data.endDate) : new Date;
    this.type = event.data.endDate ? ETimelineType.Duration : ETimelineType.Point;
    this.editable = editable;

    this.event = event;
    this.synchronised = synchronised;
  }
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent extends ViewComponent implements AfterViewInit {

  @ViewChild('visTimeline') visTimeline: ElementRef;

  private timeline: vis.Timeline;
  private items: Array<TimelineItem>;
  public selectedItem: TimelineItem;

  public mutex = new Mutex;

  constructor(userService: UserService, private _firestore: FireStoreService, private _activatedRoute: ActivatedRoute) {
    super(userService);
    userService.userChange.subscribe(_ => {
      this.fetchData();
      if (this.selectedItem) { this.focusOn(this.selectedItem); }
    });
  }

  ngAfterViewInit(): void {
    this.fetchData().then(() => {
      this.initTimeline();
      const item = this.getItem(this._activatedRoute.snapshot.paramMap.get('id'));
      if (item) {
        // wait for vis to init
        setTimeout(() => this.focusOn(item), environment.transitionTimeout * 2);
      }
    });
  }

  private fetchData(): Promise<void> {
    console.log('fetching data');
    return this._firestore.getList<ITimelineEvent>(`${EItemType.TimelineEvent}s`)
      .then(result => this.items = result.map(item => new TimelineItem(item, item.uid === UserStaticService.uid)))
      .then(() => {
        if (this.timeline) {
          this.timeline.setItems(new vis.DataSet(this.items));
        }
      });
  }

  private initTimeline(): void {
    const start = new Date(), end = new Date;
    start.setDate(start.getDate() - 3);
    end.setDate(end.getDate() + 3);
    // options
    const options: vis.TimelineOptions = {
      start: start, end: end,
      editable: { remove: false },
      onMove: (item, cb) => this.itemMoved(item),

    };
    // timeline
    this.timeline = new vis.Timeline(this.visTimeline.nativeElement, new vis.DataSet(this.items), options);
    // events
    this.timeline.on('select', (event) => this.selectedItem = this.getItem(event.items[0]));
    this.timeline.on('doubleClick', (event) => {
      if (event.snappedTime) { this.addItem(new Date(event.snappedTime)); }
    });
  }

  private focusOn(item: TimelineItem): void {
    this.selectedItem = item;
    this.timeline.setSelection(item.id);
    this.timeline.focus(item.id, { animation: true });
  }

  private getItem(id: vis.IdType): TimelineItem {
    return this.items.find(i => i.id === id);
  }

  private itemMoved(item: vis.TimelineItem): void {
    const current = this.getItem(item.id);
    current.start = item.start;
    current.event.data.startDate = new Date(item.start).valueOf();
    current.end = item.end;
    current.event.data.endDate = item.end ? new Date(item.end).valueOf() : null;
    this.updateItem(current);
  }

  private updateItem(item: TimelineItem): void {
    this.items.splice(this.items.findIndex(i => i.id === item.id), 1, item);
    this.timeline.setItems(new vis.DataSet(this.items));
    this.focusOn(item);
  }

  public contentChange(value: string): void {
    this.selectedItem.content = value;
    this.selectedItem.event.name = value;
    this.selectedItem.event.data.title = value;
    this.updateItem(this.selectedItem);
  }

  public switchEvent(): void {
    const date = new Date(this.selectedItem.start);
    switch (this.selectedItem.type) {
      case ETimelineType.Point:
        this.selectedItem.start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        this.selectedItem.end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        this.selectedItem.event.data.startDate = this.selectedItem.start.valueOf();
        this.selectedItem.event.data.endDate = this.selectedItem.end.valueOf();
        this.selectedItem.type = ETimelineType.Duration;
        break;
      case ETimelineType.Duration:
        this.selectedItem.start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
        this.selectedItem.event.data.startDate = this.selectedItem.start.valueOf();
        this.selectedItem.type = ETimelineType.Point;
        break;
    }
    this.updateItem(this.selectedItem);
  }

  public addItem(date: Date = new Date): void {
    const timelineEvent = ModelFactoryService.genereTimelineEvent({
      title: 'New Event',
      startDate: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12).valueOf(),
      endDate: null
    }, 'New Event');
    const item = new TimelineItem(timelineEvent, true, false);
    this.items.push(item);
    this.timeline.setItems(new vis.DataSet(this.items));
    this.focusOn(item);
  }

  public saveItem(): void {
    this.mutex.exec(
      (this.selectedItem.event.id ? this._firestore.update : this._firestore.add).bind(this._firestore),
      this.selectedItem.event
    ).then(result => {
      this.updateItem(new TimelineItem(result, true));
    });
  }

  public cancel(): void {
    if (!this.selectedItem.synchronised) {
      this.items.splice(this.items.indexOf(this.selectedItem), 1);
      this.timeline.setItems(new vis.DataSet(this.items));
      this.selectedItem = null;
    }
  }

  public deleteItem(): void {
    this.mutex.exec(this._firestore.delete.bind(this._firestore), this.selectedItem.event)
      .then(() => this.fetchData());
  }

}
