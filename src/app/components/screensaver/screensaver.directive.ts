import {
  Directive,
  HostListener,
  ComponentFactoryResolver,
  ComponentFactory,
  ViewContainerRef,
  ComponentRef
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { ScreensaverComponent } from './screensaver.component';

@Directive({
  selector: '[appScreensaver]'
})
export class ScreensaverDirective {
  private interval; // :NodeJS.Timer;
  private screensaverFactory: ComponentFactory<ScreensaverComponent>;
  private screensaverInstance: ComponentRef<ScreensaverComponent>;

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    this.startTimer();
  }

  constructor(
    private _viewContainerRef: ViewContainerRef,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.screensaverFactory = componentFactoryResolver.resolveComponentFactory(
      ScreensaverComponent
    );
    this.startTimer();
  }

  private startTimer() {
    if (this.screensaverInstance) {
      this.screensaverInstance.destroy();
    }
    clearInterval(this.interval);
    this.interval = setTimeout(
      this.showScreensaver.bind(this),
      // TODO: test
      2000
      // environment.transitionTimeout * 100
    );
  }

  private showScreensaver(): void {
    this.screensaverInstance = this._viewContainerRef.createComponent(
      this.screensaverFactory
    );
  }
}
