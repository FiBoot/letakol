import { Subject } from 'rxjs';

const DEFAULT_TIMESPAN = 1; // 1ms

export class IPlayerOptions {
  timespan?: number;
  loopkey?: boolean;
  preventKeys?: Array<string>;
}

export class Player {
  protected _timespan: number;
  protected _playing: boolean = false;
  protected _stoped: boolean = true; // used for startCB
  protected _cycle: number;
  private _interval: any; // NodeJS.Timer;
  private _loopkey: boolean;
  private _pressedKeys: Array<string>;
  readonly stops: Subject<void> = new Subject();

  constructor({
    timespan = DEFAULT_TIMESPAN,
    loopkey = true,
    preventKeys = []
  }: IPlayerOptions = {}) {
    this._timespan = timespan;
    this._loopkey = loopkey;
    this._pressedKeys = new Array();
    this._cycle = 0;

    // mapping key callbacks
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (preventKeys.includes(event.key)) {
        event.preventDefault();
      }
      if (!this._pressedKeys.includes(event.key)) {
        this._pressedKeys.push(event.key);
        this.keyCB(event.key, true);
      }
    });
    window.addEventListener('keyup', event => {
      if (preventKeys.includes(event.key)) {
        event.preventDefault();
      }
      if (this._pressedKeys.includes(event.key)) {
        this._pressedKeys.splice(this._pressedKeys.indexOf(event.key), 1);
      }
      this.keyCB(event.key, false);
    });
  }

  public get playing(): boolean {
    return this._playing;
  }

  public get cycle(): number {
    return this._cycle;
  }

  public get pressedKeys(): Array<string> {
    return this._pressedKeys;
  }

  public start(): void {
    if (this.playing) {
      this.pause();
    } else {
      if (this._stoped) {
        this._cycle = 0;
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
    this._cycle += 1;
    this.loopCB();
    if (this.playing) {
      this._interval = setTimeout(() => this.loop(), this._timespan);
      if (this._loopkey) {
        this._pressedKeys.forEach(key => this.keyCB(key, true));
      }
    } else {
      this.stop();
    }
  }

  protected startCB(): void {}
  protected loopCB(): void {}
  protected keyCB(key: string, pressed: boolean) {}
}
