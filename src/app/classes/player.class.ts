import { Subject } from 'rxjs';

const DEFAULT_TIMESPAN = 1; // 1ms

export class Player {
  protected _playing: boolean = false;
  protected _stoped: boolean = true; // used for startCB
  protected _cycle: number;
  private _interval: any; // NodeJS.Timer;
  readonly stops: Subject<void> = new Subject();

  constructor(protected _timespan: number = DEFAULT_TIMESPAN) {
    this._cycle = 0;
  }

  public get playing(): boolean {
    return this._playing;
  }

  public get cycle(): number {
    return this._cycle;
  }

  public start(): void {
    if (this.playing) {
      this.pause();
    } else {
      if (this._stoped) {
        this.startCB();
      }
      this._playing = true;
      this._stoped = false;
      this.loop();
    }
  }

  public stop(): void {
    this.pause();
    this._stoped = true;
    this.stops.next();
  }

  private pause(): void {
    this._playing = false;
    clearInterval(this._interval);
  }

  private loop(): void {
    this.loopCB((this._cycle += 1));
    if (this.playing) {
      this._interval = setTimeout(() => this.loop(), this._timespan);
    } else {
      this.stop();
    }
  }

  protected startCB(): void {}
  protected loopCB(cycle: number): void {}
}
