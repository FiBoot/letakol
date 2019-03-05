import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-screensaver',
  templateUrl: './screensaver.component.html',
  styleUrls: ['./screensaver.component.css']
})
export class ScreensaverComponent implements AfterViewInit, OnDestroy {
  readonly TIMESPAN = 10;
  readonly LOGOSIZE = 100;

  public show = true;
  private interval;

  private screenWidth: number;
  private screenHeight: number;
  private logoHorizontalPosition = 0;
  private logoVerticalPosition = 0;
  private horizontalVector = 1;
  private verticalVector = 1;

  public logoStyle;

  @ViewChild('screensaver') wrapRef: ElementRef<HTMLDivElement>;
  @ViewChild('logo') logoRef: ElementRef<HTMLDivElement>;

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    this.show = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize();
  }

  ngAfterViewInit(): void {
    this.resize();
    this.interval = setInterval(this.loop.bind(this), this.TIMESPAN);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  private resize(): void {
    this.screenWidth = this.wrapRef.nativeElement.clientWidth;
    this.screenHeight = this.wrapRef.nativeElement.clientHeight;
  }

  private loop(): void {
    // increment position
    this.logoHorizontalPosition += this.horizontalVector;
    this.logoVerticalPosition += this.verticalVector;

    // check colisions
    if (
      this.horizontalVector > 0 &&
      this.logoHorizontalPosition + this.LOGOSIZE > this.screenWidth
    ) {
      this.logoHorizontalPosition = this.screenWidth - this.LOGOSIZE;
      this.horizontalVector = -1;
    }
    if (this.horizontalVector < 0 && this.logoHorizontalPosition < 0) {
      this.logoHorizontalPosition = 0;
      this.horizontalVector = 1;
    }
    if (this.verticalVector > 0 && this.logoVerticalPosition + this.LOGOSIZE > this.screenHeight) {
      this.logoVerticalPosition = this.screenHeight - this.LOGOSIZE;
      this.verticalVector = -1;
    }
    if (this.verticalVector < 0 && this.logoVerticalPosition < 0) {
      this.logoHorizontalPosition = 0;
      this.verticalVector = 1;
    }

    // form style
    this.logoStyle = {
      top: `${this.logoVerticalPosition}px`,
      left: `${this.logoHorizontalPosition}px`
    };
  }
}
