import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IFireBaseItem } from 'src/app/models/firebaseItem.model';
import { Utils } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-item-date',
  templateUrl: './item-date.component.html',
  styleUrls: ['./item-date.component.css']
})
export class ItemDateComponent implements OnChanges {

  @Input() item: IFireBaseItem;

  public creationDate: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.creationDate = Utils.timestampToLocaleDate(this.item.creationDate);
  }
}
