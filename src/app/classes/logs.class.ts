
export enum LOG_LEVEL { LOG, INFO, WARN, ERROR }

export class Log {
  constructor(public message: string, public level: LOG_LEVEL = LOG_LEVEL.LOG) { }
}

const HISTORY_COUNT = 1000;

export class Logs {

  // TODO: observable?
  private _list = new Array<Log>();
  public readonly historyCount: number;

  constructor(historyCount: number = HISTORY_COUNT) {
    this.historyCount = historyCount > 0 ? historyCount : HISTORY_COUNT;
  }

  get list(): Array<Log> { return this._list; }

  private checkHistoryLength() {
    if (this._list.length + 1 > this.historyCount) {
      this._list.splice(0, 1);
    }
  }

  public addLog(log: Log): void {
    this.checkHistoryLength();
    this._list.push(log);
  }

  public addLogMessage(message: string, level: LOG_LEVEL = LOG_LEVEL.LOG): void {
    this.addLog(new Log(message, level));
  }

  public reset(): void {
    this._list = new Array<Log>();
  }
}
