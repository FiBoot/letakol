import { BomberLan } from './classes/bomberlan.class';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bomberlan',
  templateUrl: './bomberlan.component.html',
  styleUrls: ['./bomberlan.component.css']
})
export class BomberlanComponent implements AfterViewInit {
  @ViewChild('bomberlanWrapper') wrapper: ElementRef;

  ngAfterViewInit(): void {
    new BomberLan(this.wrapper.nativeElement);
  }
}
