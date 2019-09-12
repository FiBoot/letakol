import OpenSimplexNoise from 'open-simplex-noise';
import { Canvas } from 'src/app/classes/canvas.class';
import { Utils } from 'src/app/services/utils/utils.service';

export class ArchitectsLogo extends Canvas {
  readonly MAX_ALPHA: number = 255;
  readonly CIRCLE_ALPHA_RATIO: number = 100;
  readonly CIRCLE_SIZE_RATIO: number = 1 / 5;

  private openSimplex: OpenSimplexNoise = new OpenSimplexNoise(Date.now());
  private zNoiseOffset: number = 0;

  public terraformThreshold: number = 3;
  public noiseSpeed: number = 4;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, playerOption: { timespan: 30 } });
    
    this.start();
  }

  fillPixel(data: Uint8ClampedArray, index: number, alpha: number): void {
    data[index + 0] = alpha; // red
    data[index + 1] = alpha; // green
    data[index + 2] = alpha; // blue
    data[index + 3] = this.MAX_ALPHA; // alpha
  }

  noise(x: number, y: number, z: number): number {
    return this.openSimplex.noise3D(x / 100, y / 100, z / 100);
  }

  circleDistance(xp: number, yp: number, xc: number, yc: number) {
    return Math.sqrt(Math.pow(Math.abs(xp - xc), 2) + Math.pow(Math.abs(yp - yc), 2));
  }

  genereNoiseColor(x: number, y: number): number {
    // do not calculate if number is in inner circle
    if (Utils.isInCircle(x, y, this.halfSize, this.halfSize, this.size * this.CIRCLE_SIZE_RATIO)) {
      return 0;
    }
    // else do the maths
    const xratio = (Math.abs(this.halfSize - x) / this.halfSize) * this.CIRCLE_ALPHA_RATIO;
    const yratio = (Math.abs(this.halfSize - y) / this.halfSize) * this.CIRCLE_ALPHA_RATIO;
    const noise = this.noise(x, y, this.zNoiseOffset) * (this.MAX_ALPHA - this.CIRCLE_ALPHA_RATIO * 2);
    const alpha = Math.round(noise + xratio + yratio);
    return this.MAX_ALPHA - (alpha - (alpha % Math.pow(2, this.terraformThreshold)));
  }

  drawCircle(): void {
    this.render.beginPath();
    this.render.lineWidth = this.size / 100;
    this.render.strokeStyle = '#111';
    this.render.arc(this.halfSize, this.halfSize, this.size * this.CIRCLE_SIZE_RATIO, 0, 2 * Math.PI);
    this.render.stroke();
  }

  loopCB(): void {
    const imageData = this.render.getImageData(0, 0, this.size, this.size);
    if (imageData) {
      for (let x = 0; x < this.size; x++) {
        for (let y = 0; y < this.size; y++) {
          const i = (y * this.size + x) * 4;
          const r = this.genereNoiseColor(x, y);
          this.fillPixel(imageData.data, i, r);
        }
      }
      this.zNoiseOffset += this.noiseSpeed;
      this.render.putImageData(imageData, 0, 0);
      // to smooth circle outline
      this.drawCircle();
    }
  }
}
