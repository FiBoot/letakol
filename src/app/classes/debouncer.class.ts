import { Logger } from '../services/logger/logger.service';
import { Subject } from 'rxjs';

const DEFAULT_TIMESPAN = 800;

export class Debouncer {
  private _timeoutID: any; // NodeJS.Timeout | undefined;
  private _loading: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _callback: (...arg: Array<any>) => void,
    private _timeout: number = DEFAULT_TIMESPAN
  ) {
    this._loading.next(false);
  }

  public destroy(): void {
    this.clear();
  }

  public get loading(): Subject<boolean> {
    return this._loading;
  }

  public clear(): void {
    clearInterval(this._timeoutID);
  }

  public setCallback(callback: () => void): void {
    this._callback = callback;
  }

  public setTimeout(timeout: number): void {
    this._timeout = timeout;
  }

  public exec(...arg: any): void {
    this.clear();
    try {
      this._loading.next(true);
      this._timeoutID = setTimeout(() => {
        this._callback(...arg);
        this._loading.next(false);
      }, this._timeout);
    } catch (error) {
      this._loading.next(false);
      Logger.error(`[Debouncer] exec callback failed`, error);
    }
  }
}
