import { Utils } from 'src/app/services/utils/utils.service';

const MAX_VERTICES = 256;

export class Noise {
  private _amplitude: number = 1;
  private _scale: number = 1;
  private r: Array<number>;

  constructor(private _maxVertices = MAX_VERTICES) {
    this.initVertices();
  }

  private initVertices() {
    this.r = Utils.repeat(() => Math.random(), this._maxVertices);
  }

  private lerp(a: number, b: number, t: number): number {
    return a * (1 - t) + b * t;
  }

  public setAmplitude(amplitude: number): void {
    this._amplitude = amplitude;
  }

  public setScale(scale: number): void {
    this._scale = scale;
  }

  public setMaxVertices(maxVertices: number): void {
    this._maxVertices = maxVertices;
    this.initVertices();
  }

  public getVal(x: number) {
    const scaledX = x * this._scale;
    const xFloor = Math.floor(scaledX);
    const t = scaledX - xFloor;
    const tRemapSmoothstep = t * t * (3 - 2 * t);

    const xMin = xFloor % (this._maxVertices - 1);
    const xMax = (xMin + 1) % (this._maxVertices - 1);

    const y = this.lerp(this.r[xMin], this.r[xMax], tRemapSmoothstep);

    return y * this._amplitude;
  }
}
