import { Utils } from '../services/utils/utils.service';

const PRECISION = 4;

export class Pos {
  constructor(private _val: number = 0, private _max: number = 0, private _min: number = 0) {}

  public get val(): number {
    return this._val;
  }

  public get fval(): number {
    return Math.floor(this._val);
  }

  public set val(val: number) {
    this._val = Utils.contain(Utils.fixed(val, PRECISION), this._max, this._min);
  }

  public set max(max: number) {
    this._max = Utils.contain(max);
    this.val = this._val;
  }

  public set min(min: number) {
    this._min = min;
    this.val = this._val;
  }

  public toString(): string {
    return `${this.val}`;
  }
}
