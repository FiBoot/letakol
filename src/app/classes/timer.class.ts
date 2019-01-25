import { Utils } from '../services/utils/utils.service';

export class Timer {
  private _startDate;
  private _totalTime;

  constructor(private readonly name: string) { }

  public start(): void {
    this._totalTime = null;
    this._startDate = new Date;
  }

  public stop(): number {
    const endDate = new Date;
    this._totalTime = (endDate.getTime() - this._startDate.getTime()) / 1000;
    return this._totalTime;
  }

  public get value(): number {
    if (this._totalTime) {
      return Utils.fixed(this._totalTime, 2);
    }
    if (this._startDate) {
      const currentDate = new Date;
      const time = (currentDate.getTime() - this._startDate.getTime()) / 1000;
      return Utils.fixed(time, 2);
    }
    return 0;
  }

  public toString(): string {
    return `[${this.name}] Time: ${this.value}sec`;
  }
}
