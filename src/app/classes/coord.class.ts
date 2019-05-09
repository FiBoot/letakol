import { Pos } from './pos.class';

export class Coordinates {
  private _x: Pos;
  private _y: Pos;

  /**
   *Creates an instance of Coordinates.
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @param {number} [_xMax=0]
   * @param {number} [_yMax=xMax]
   * @memberof Coordinates
   */
  constructor(
    x: number = 0,
    y: number = 0,
    xMax: number = 0,
    yMax: number = xMax
  ) {
    this._x = new Pos(x, xMax);
    this._y = new Pos(y, yMax);
  }

  public get x(): number {
    return this._x.val;
  }
  public get y(): number {
    return this._y.val;
  }
  public get fx(): number {
    return this._x.fval;
  }
  public get fy(): number {
    return this._y.fval;
  }
  public set x(x: number) {
    this._x.val = x;
  }
  public set y(y: number) {
    this._y.val = y;
  }
  public set max(max: number) {
    this._x.max = max;
    this._y.max = max;
  }

  public set xMax(max: number) {
    this._x.max = max;
  }

  public set yMax(max: number) {
    this._y.max = max;
  }

  /**
   * Set both of x and y
   *
   * @param {number} x
   * @param {number} y
   * @memberof Coordinates
   */
  public set(x: number, y: number): void {
    this._x.val = x;
    this._y.val = y;
  }

  public toString(): string {
    return `${this.x}, ${this.y}`;
  }
}
