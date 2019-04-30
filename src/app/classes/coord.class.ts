import { Utils } from '../services/utils/utils.service';

export class Coordinates {
  /**
   *Creates an instance of Coordinates.
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @param {number} [_max=0]
   * @memberof Coordinates
   */
  constructor(private _x: number = 0, private _y: number = 0, private _max: number = 0) {}

  public get x(): number {
    return this._x;
  }
  public get y(): number {
    return this._y;
  }
  public set x(x: number) {
    this._x = Utils.contain(x, this._max);
  }
  public set y(y: number) {
    this._y = Utils.contain(y, this._max);
  }
  public set max(max: number) {
    this._max = Utils.contain(max);
    this.set(this.x, this.y);
  }

  /**
   * Set both of x and y
   *
   * @param {number} x
   * @param {number} y
   * @memberof Coordinates
   */
  public set(x: number, y: number): void {
    this._x = x;
    this._y = y;
  }

  public toString(): string {
    return `${this.x}, ${this.y}`;
  }
}
