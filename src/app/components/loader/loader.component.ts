import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utils } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnChanges {
  @Input() show: boolean;

  public hidding: boolean;
  public hidden: boolean;

  constructor() {
    this.hidding = false;
    this.hidden = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('show') && changes.show) {
      setTimeout(() => {
        this.hidding = true;
        setTimeout(() => {
          this.hidden = true;
        }, environment.transitionTimeout);
      }, environment.transitionTimeout);
    }
  }
}
