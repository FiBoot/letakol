import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-display-object',
  templateUrl: './display-object.component.html',
  styleUrls: ['./display-object.component.css']
})
export class DisplayObjectComponent implements OnChanges {
  @Input() object: Object;
  @Input() hidden: boolean = false;

  public keyObject: Array<{ key: string; value: any; type: string; hidden: boolean }>;

  constructor() {}

  ngOnChanges(_: SimpleChanges): void {
    if (this.object) {
      this.keyObject = [];
      for (const key in this.object) {
        this.keyObject.push({
          key,
          value: this.object[key],
          type: typeof this.object[key],
          hidden: this.hidden
        });
      }
    }
  }
}
