import { Canvas } from 'src/app/classes/canvas.class';
import { Coordinates } from 'src/app/classes/coord.class';
import { Utils } from 'src/app/services/utils/utils.service';

const TIMESPAN = 100;
const UNITS_PER_LINE = 10;
const LEVEL_COEF = 2;
const TOTAL_UNITS = UNITS_PER_LINE * LEVEL_COEF;

enum U {
  E = '#EEE', // Empty
  B = '#333' // Block
}

export class SMW extends Canvas {
  private _pos: Coordinates;
  private _level: Array<Array<U>>;

  private _clip: boolean;
  private _clipPos: { x: number; y: number };

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, unitsPerLine: UNITS_PER_LINE, playerOption: { timespan: TIMESPAN } });

    this._pos = new Coordinates(TOTAL_UNITS / 4, TOTAL_UNITS / 4, TOTAL_UNITS - this.unitsPerLine);
    this._level = this.genereLevel();

    this.start();
  }

  onResize(): void {
    if (this._level) {
      this.drawGrid();
    }
  }

  onMouse(down: boolean, x: number, y: number): void {
    if (!this._clip && down) {
      this._clipPos = { x, y };
    }
    this._clip = down;
  }

  onMouseMove(x: number, y: number): void {
    if (this._clip) {
      this._pos.x -= (x - this._clipPos.x) / this.unitSize;
      this._pos.y -= (y - this._clipPos.y) / this.unitSize;
    }
    this._clipPos = { x, y };
  }

  onClick(x: number, y: number): void {}

  onScroll(up: boolean): void {
    this.unitsPerLine = Utils.contain(this.unitsPerLine + (up ? 1 : -1), UNITS_PER_LINE, 1);
  }

  keyCB(key: string, pressed: boolean): void {}

  loopCB(): void {
    this.drawGrid();
  }

  private genereLevel(): Array<Array<U>> {
    const level = new Array<Array<U>>();
    for (let y = 0; y < TOTAL_UNITS; y++) {
      const line = new Array<U>();
      for (let x = 0; x < TOTAL_UNITS; x++) {
        line.push(Utils.random(4) ? U.E : U.B);
      }
      level.push(line);
    }
    return level;
  }

  private drawGrid(): void {
    this.render.clearRect(0, 0, this.size, this.size);
    for (let y = 0; y <= this.unitsPerLine; y++) {
      for (let x = 0; x <= this.unitsPerLine; x++) {
        if (this._level[y + Math.floor(this._pos.y)]) {
          // square
          this.render.fillStyle = this._level[y + Math.floor(this._pos.y)][
            x + Math.floor(this._pos.x)
          ];
          this.render.fillRect(
            (x - (this._pos.x % 1)) * this.unitSize,
            (y - (this._pos.y % 1)) * this.unitSize,
            this.unitSize,
            this.unitSize
          );
          // text
          this.render.strokeStyle = 'green';
          this.render.strokeText(
            `${y * this.unitsPerLine + x}`,
            (x - (this._pos.x % 1)) * this.unitSize,
            (y - (this._pos.y % 1)) * this.unitSize + this.unitSize / 2,
            this.unitSize
          );
        }
      }
    }
  }
}
