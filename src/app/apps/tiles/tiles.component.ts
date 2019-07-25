import { Tiles } from './classes/tiles.class';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.css']
})
export class TilesComponent implements AfterViewInit, OnDestroy {

  @ViewChild('tileWrapper') wrapper: ElementRef;

  private tiles: Tiles;

  ngAfterViewInit() {
    this.tiles = new Tiles(this.wrapper.nativeElement);
  }

  ngOnDestroy(): void {
    this.tiles.destory();
  }
}
