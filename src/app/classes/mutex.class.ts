import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Timer } from './timer.class';

export class Mutex {
  private readonly PROMISE_TIMEOUT = environment.promiseTimeout;
  private readonly TIMEDOUT_MESSAGE = 'Request timed-out';
  private readonly RUNNING_MESSAGE = 'Request is already running';

  private _timer: Timer = new Timer('Mutex');
  private _lockSubject = new Subject<boolean>();
  private _errorSubject = new Subject<any>();
  private _lock: boolean;
  private _error: string;

  constructor(private timedout: boolean = true) {
    this._lockSubject.next(false);
    this._lockSubject.subscribe(next => this._lock = next);
    this._errorSubject.subscribe(next => this._error = next);
  }

  get error(): string { return this._error; }
  get lock(): boolean { return this._lock; }

  public exec(req: ((...arg: Array<any>) => Promise<any>), ...arg: Array<any>): Promise<any> {
    this._errorSubject.next(null);
    this._lockSubject.next(false);

    return new Promise((resolve, reject) => {
      // promise timeout
      setTimeout(() => {
        if (!this.timedout && this._lock) {
          this._stopPromise(this.TIMEDOUT_MESSAGE, false);
          resolve();
        }
      }, this.PROMISE_TIMEOUT);

      if (!this._lock) {
        // exec request
        this._lockSubject.next(true);
        this._timer.start();
        req(arg[0], arg[1], arg[2], arg[3])
          .then(result => {
            this._stopPromise(null, false);
            resolve(result);
          }).catch(err => {
            this._stopPromise(err.message, false);
            console.warn(`[Mutex] Request failed`, err);
            resolve();
          });
      } else {
        // locked
        this._errorSubject.next(this.RUNNING_MESSAGE);
        resolve();
      }
    });
  }

  private _stopPromise(message: string, lock: boolean = false): void {
    this._stopTimer();
    this._errorSubject.next(message);
    this._lockSubject.next(lock);
  }

  private _stopTimer(): void {
    this._timer.stop();
    console.log(this._timer.toString());
  }

}
