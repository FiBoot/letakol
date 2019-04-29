import { Canvas } from 'src/app/classes/canvas.class';
import { Utils } from 'src/app/services/utils/utils.service';

const TIMESPAN = 100;
const UNITS_PER_LINE = 20;
const LEVEL_COEF = 5;
const LEVEL_SIZE = UNITS_PER_LINE * LEVEL_COEF;
const SPEED = 1;

enum U {
  E = '#EEE', // Empty
  B = '#333' // Block
}

export class SMW extends Canvas {
  private _pos: { x: number; y: number };
  private _level: Array<Array<U>>;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, unitsPerLine: UNITS_PER_LINE, playerOption: { timespan: TIMESPAN } });

    this._pos = { x: LEVEL_SIZE / 2, y: LEVEL_SIZE / 2 };
    this._level = this.genereLevel();

    this.start();
  }

  onResize() {
    if (this._level) {
      this.drawGrid();
    }
  }

  onClick(x: number, y: number) {
    console.log(`${x}, ${y}`);
  }

  keyCB(key: string, pressed: boolean): void {
    let np: number;
    if (pressed) {
      switch (key) {
        case 'ArrowUp':
          np = Utils.fixed(this._pos.y - SPEED, 1);
          this._pos.y = np > 0 ? np : 0;
          break;
        case 'ArrowDown':
          np = Utils.fixed(this._pos.y + SPEED, 1);
          this._pos.y = np < LEVEL_SIZE - UNITS_PER_LINE ? np : LEVEL_SIZE - UNITS_PER_LINE;
          break;
        case 'ArrowLeft':
          np = Utils.fixed(this._pos.x - SPEED, 1);
          this._pos.x = np > 0 ? np : 0;
          break;
        case 'ArrowRight':
          np = Utils.fixed(this._pos.x + SPEED, 1);
          this._pos.x = np < LEVEL_SIZE - UNITS_PER_LINE ? np : LEVEL_SIZE - UNITS_PER_LINE;
          break;
        default:
          console.log(key);
      }
    }
  }

  loopCB(): void {
    this.drawGrid();
  }

  private genereLevel(): Array<Array<U>> {
    const level = new Array<Array<U>>();
    for (let y = 0; y < LEVEL_SIZE; y++) {
      const line = new Array<U>();
      for (let x = 0; x < LEVEL_SIZE; x++) {
        line.push(Utils.random(4) ? U.E : U.B);
      }
      level.push(line);
    }
    return level;
  }

  private drawGrid(): void {
    for (let y = 0; y < UNITS_PER_LINE; y++) {
      for (let x = 0; x <= UNITS_PER_LINE; x++) {
        this.render.fillStyle = this._level[y + Math.floor(this._pos.y)][
          x + Math.floor(this._pos.x)
        ];
        this.render.fillRect(
          (x - (this._pos.x % 1)) * this.unitSize,
          (y - (this._pos.y % 1)) * this.unitSize,
          this.unitSize,
          this.unitSize
        );
      }
    }
  }
}
