import { ArchitectsLogo } from './classes/architects-logo.class';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Canvas } from 'src/app/classes/canvas.class';

@Component({
  selector: 'app-architects-logo',
  templateUrl: './architects-logo.component.html',
  styleUrls: ['./architects-logo.component.css']
})
export class ArchitectsLogoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('logoWrapper') wrapper: ElementRef;
  app: Canvas;

  ngAfterViewInit() {
    this.app = new ArchitectsLogo(this.wrapper.nativeElement);
  }

  ngOnDestroy(): void {
    this.app.stop();
  }
}
