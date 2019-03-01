import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-screensaver',
  templateUrl: './screensaver.component.html',
  styleUrls: ['./screensaver.component.css']
})
export class ScreensaverComponent implements AfterViewInit {
  public test = true;

  private wWidth: number;
  private wHeight: number;

  @ViewChild('screensaver') wrapRef: ElementRef<HTMLDivElement>;
  @ViewChild('logo') logoRef: ElementRef<HTMLDivElement>;

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    this.test = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event);
    this.resize();
  }

  ngAfterViewInit(): void {
    this.resize();
  }

  private resize(): void {
    this.wWidth = this.wrapRef.nativeElement.clientWidth;
    this.wHeight = this.wrapRef.nativeElement.clientHeight;
    console.log(this.wWidth, this.wHeight);
  }

}
