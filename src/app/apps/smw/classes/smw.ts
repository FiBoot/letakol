import { Canvas } from 'src/app/classes/canvas.class';

const UNITS_PER_LINE = 10;
enum U {
  E = '#EEE', // Empty
  B = '#333' // Block
}

export class SMW extends Canvas {
  private position: number = UNITS_PER_LINE / 2;
  private level: Array<Array<U>>;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, unitsPerLine: UNITS_PER_LINE, playerOption: { timespan: 1000 } });

    this.render.fillStyle = '#eee';
    this.render.fillRect(0, 0, this.size, this.size);

    this.level = [
      [U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E],
      [U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E],
      [U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E],
      [U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E],
      [U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E],
      [U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E],
      [U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.E],
      [U.E, U.E, U.E, U.E, U.E, U.E, U.E, U.B, U.B, U.E, U.E, U.E, U.E, U.E, U.E],
      [U.E, U.E, U.B, U.E, U.B, U.E, U.E, U.B, U.B, U.B, U.E, U.E, U.E, U.E, U.E],
      [U.B, U.B, U.B, U.B, U.B, U.B, U.B, U.B, U.B, U.B, U.B, U.B, U.B, U.E, U.E]
    ];

    this.start();
  }

  onResize() {
    console.log('eh salut');
  }
  onClick(x: number, y: number) {
    console.log(`${x}, ${y}`);
  }

  keyCB(key: string, pressed: boolean): void {
    if (pressed) {
      console.log(key);
    }
  }

  loopCB(): void {
    this.render.clearRect(0, 0, this.size, this.size);
    for (let y = 0; y < this.level.length; y++) {
      const pos = Math.floor(this.position);
      console.log(pos, Math.ceil(pos) + UNITS_PER_LINE);
      for (let x = 0, i = pos - UNITS_PER_LINE / 2; i < pos + 1 + UNITS_PER_LINE; x++, i++) {
        this.render.fillStyle = this.level[y][i];
        this.render.fillRect(x * this.unitSize, y * this.unitSize, this.unitSize, this.unitSize);
      }
    }
  }
}
