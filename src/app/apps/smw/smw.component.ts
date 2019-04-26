import { SMW } from './classes/smw';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-smw',
  templateUrl: './smw.component.html',
  styleUrls: ['./smw.component.css']
})
export class SmwComponent implements AfterViewInit {
  @ViewChild('canvasWrap') div: ElementRef<HTMLDivElement>;

  public canvasWidth: number = 400;
  public canvasHeight: number = 300;

  constructor() {}

  ngAfterViewInit(): void {
    new SMW(this.div.nativeElement);
  }
}
