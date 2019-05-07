import { SMW } from './classes/smw';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-smw',
  templateUrl: './smw.component.html',
  styleUrls: ['./smw.component.css']
})
export class SmwComponent implements AfterViewInit {
  @ViewChild('canvasWrap') div: ElementRef<HTMLDivElement>;

  constructor() {}

  ngAfterViewInit(): void {
    new SMW(this.div.nativeElement);
  }
}
