import { Perlain } from './classes/perlain.class';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-perlin-terrain',
  templateUrl: './perlin-terrain.component.html',
  styleUrls: ['./perlin-terrain.component.css']
})
export class PerlinTerrainComponent implements AfterViewInit {
  @ViewChild('perlainWrap') wrap: ElementRef<HTMLDivElement>;

  constructor() {}

  ngAfterViewInit() {
    new Perlain(this.wrap.nativeElement);
  }
}
