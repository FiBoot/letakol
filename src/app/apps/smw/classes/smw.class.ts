import { LEVELS } from '../levels/levels';
import { Block, Empty, Unknow } from './blocks.class';
import { Canvas } from 'src/app/classes/canvas.class';
import { Pos } from 'src/app/classes/Pos.class';
import { Utils } from 'src/app/services/utils/utils.service';

const TIMESPAN = 100;
const SELECTED_LEVEL = LEVELS[0];

export class SMW extends Canvas {
  private _pos: Pos;
  private _level: Array<Array<Block>>;

  private _clip: boolean;
  private _clipPos: Pos;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, unitsPerLine: SELECTED_LEVEL.length, playerOption: { timespan: TIMESPAN } });

    this._pos = new Pos(0, SELECTED_LEVEL[0].length - SELECTED_LEVEL.length);
    this._clipPos = new Pos();

    this._level = this.genereLevel(SELECTED_LEVEL);

    this.start();
  }

  onResize(): void {
    if (this._level) {
      this.drawGrid();
    }
  }

  onMouse(pressed: boolean, x: number, y: number): void {
    this._clip = pressed;
  }

  onMouseMove(x: number, y: number): void {
    if (this._clip) {
      this._pos.val += (this._clipPos.val - x) / this.unitSize;
    }
    this._clipPos.val = x;
  }

  onClick(x: number, y: number): void {}

  onScroll(up: boolean): void {
    this.unitsPerLine = Utils.contain(this.unitsPerLine + (up ? 1 : -1), this._level.length, 1);
  }

  keyCB(key: string, pressed: boolean): void {}

  loopCB(): void {
    this.drawGrid();
  }

  // private genereRandomLevel(): Array<Array<Block>> {
  //   const level = new Array<Array<Block>>();
  //   for (let y = 0; y < TOTAL_UNITS; y++) {
  //     const line = new Array<Block>();
  //     for (let x = 0; x < TOTAL_UNITS; x++) {
  //       line.push(Utils.random(4) ? new Empty() : new Block());
  //     }
  //     level.push(line);
  //   }
  //   return level;
  // }

  private genereLevel(level: Array<Array<number>>): Array<Array<Block>> {
    const createBlock = val => {
      switch (val) {
        case 0:
          return new Empty();
        case 1:
          return new Block();
        default:
          return new Unknow();
      }
    };
    return level.map(line => line.map(val => createBlock(val)));
  }

  private drawGrid(): void {
    this.render.clearRect(0, 0, this.size, this.size);
    for (let y = 0; y <= this.unitsPerLine; y++) {
      for (let x = 0; x <= this.unitsPerLine; x++) {
        if (this._level[y] && this._level[y][x + this._pos.fval]) {
          // square
          this.render.fillStyle = this._level[y][x + this._pos.fval].color;
          this.render.fillRect(
            (x - (this._pos.val % 1)) * this.unitSize,
            y * this.unitSize,
            this.unitSize,
            this.unitSize
          );
          // // text
          // this.render.font = 'normal 8px Verdana';
          // this.render.strokeStyle = 'green';
          // this.render.strokeText(
          //   `${y + this._pos.fy}, ${x + this._pos.val}`,
          //   (x - (this._pos.val % 1)) * this.unitSize,
          //   y * this.unitSize + (this.unitSize * 1) / 3 - this.unitSize / 10,
          //   this.unitSize
          // );
          // // test 2
          // this.render.strokeStyle = 'blue';
          // this.render.strokeText(
          //   `${y * this.unitsPerLine + x}`,
          //   (x - (this._pos.val % 1)) * this.unitSize,
          //   y * this.unitSize + (this.unitSize * 2) / 3 - this.unitSize / 10,
          //   this.unitSize
          // );
          // // test 2
          // this.render.strokeStyle = 'red';
          // this.render.strokeText(
          //   `${this._level[y + this._pos.fy][x + this._pos.val].type}`,
          //   (x - (this._pos.val % 1)) * this.unitSize,
          //   y * this.unitSize + this.unitSize - this.unitSize / 10,
          //   this.unitSize
          // );
        }
      }
    }
  }
}
