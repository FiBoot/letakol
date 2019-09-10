import OpenSimplexNoise from 'open-simplex-noise';
import { Canvas } from 'src/app/classes/canvas.class';

export class ArchitectsLogo extends Canvas {
  private openSimplex: OpenSimplexNoise;
  private inc: number;
  private zoff: number;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, playerOption: { timespan: 60 } });
    this.openSimplex = new OpenSimplexNoise(Date.now());

    this.inc = 0.01;
    this.zoff = 0;
    this.start();
  }

  fillPixel({ data }, i, c) {
    data[i + 0] = c; // red
    data[i + 1] = c; // green
    data[i + 2] = c; // blue
    data[i + 3] = 255; // alpha
  }

  genereNoiseColor(x, y): number {
    const r = Math.round(this.openSimplex.noise3D(x, y, this.zoff) * 128) + 128;
    return r - (r % 16);
  }

  loopCB(): void {
    const imageData = this.render.getImageData(0, 0, this.size, this.size);
    this.zoff += this.inc * 10;
    if (imageData) {
      let yoff = 0;
      for (let x = 0; x < imageData.width; x++) {
        let xoff = 0;
        for (let y = 0; y < imageData.height; y++) {
          const i = (y * imageData.height + x) * 4;
          const r = this.genereNoiseColor(xoff, yoff);
          this.fillPixel(imageData, i, r);
          xoff += this.inc;
        }
        yoff += this.inc;
      }
      this.render.putImageData(imageData, 0, 0);
    }
  }
}
