import { Orbs } from './classes/orbs.class';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-orbs',
  templateUrl: './orbs.component.html',
  styleUrls: ['./orbs.component.css']
})
export class OrbsComponent implements AfterViewInit {
  @ViewChild('orbsWrapper') wrapper: ElementRef;

  ngAfterViewInit() {
    new Orbs(this.wrapper.nativeElement);
  }
}
