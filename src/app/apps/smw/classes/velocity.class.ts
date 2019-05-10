import { Pos } from 'src/app/classes/Pos.class';

export enum EDir {
  FORWARD = 1,
  BACKWARD = -1
}

export class Velocity {
  private _vel: Pos;

  constructor(min: number, max: number, readonly speed: number) {
    this._vel = new Pos(0, max, min);
  }

  public get val(): number {
    return this._vel.val;
  }

  public increase(dir: EDir = EDir.FORWARD): void {
    this._vel.val += dir * this.speed;
  }

  public decrease(): void {
    this._vel.val /= 2;
  }
}
