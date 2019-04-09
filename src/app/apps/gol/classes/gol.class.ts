import { Player } from 'src/app/classes/player.class';
import { Utils } from 'src/app/services/utils/utils.service';

const DEFAULT_TIMESPAN = 250;
const LIFE_COLORS = {
  Alive: '#333',
  Dead: '#FAFAFA'
};

export class GameOfLife extends Player {
  private lifeArray: Array<boolean>;
  private cellPerLine: number;

  constructor(
    private render: CanvasRenderingContext2D,
    readonly canvasSize: number,
    readonly cellSize: number,
    readonly timespan: number = DEFAULT_TIMESPAN
  ) {
    super(timespan);
    this.cellPerLine = Utils.fixed(canvasSize / cellSize);

    this.stops.subscribe(_ => this.init());
    this.init();
  }

  private newLifeArray(): Array<boolean> {
    const arr = new Array<boolean>();
    for (let i = 0; i < Utils.square(this.cellPerLine); i++) {
      arr.push(false);
    }
    return arr;
  }

  private init(): void {
    this.lifeArray = this.newLifeArray();
    this.drawLifeArray();
  }

  private drawLifeArray(): void {
    this.render.clearRect(0, 0, this.canvasSize, this.canvasSize);
    this.lifeArray.forEach((life, index) => {
      this.drawLife(index % this.cellPerLine, Math.floor(index / this.cellPerLine), life);
    });
  }

  private drawLife(x: number, y: number, life: boolean): void {
    const gap = Utils.fixed(this.cellSize / this.cellPerLine, 1);
    this.render.fillStyle = life ? LIFE_COLORS.Alive : LIFE_COLORS.Dead;
    this.render.fillRect(
      x * this.cellSize + gap,
      y * this.cellSize + gap,
      this.cellSize - gap * 2,
      this.cellSize - gap * 2
    );
  }

  private getAliveNeighboursCount(index: number): number {
    let aliveNeighbours = 0;
    [
      !(index % this.cellPerLine) ? -1 : -this.cellPerLine - 1,
      -this.cellPerLine,
      !((index + 1) % this.cellPerLine) ? -(this.cellPerLine * 2) + 1 : -this.cellPerLine + 1,
      !(index % this.cellPerLine) ? this.cellPerLine - 1 : -1,
      !((index + 1) % this.cellPerLine) ? 1 - this.cellPerLine : 1,
      !(index % this.cellPerLine) ? this.cellPerLine * 2 - 1 : this.cellPerLine - 1,
      this.cellPerLine,
      !((index + 1) % this.cellPerLine) ? 1 : this.cellPerLine + 1
    ].forEach(neighbours => (aliveNeighbours += this.lifeArray[index + neighbours] ? 1 : 0));
    return aliveNeighbours;
  }

  private nextGeneration(): Array<boolean> {
    const newGen = this.newLifeArray();
    this.lifeArray.forEach((life, index) => {
      switch (this.getAliveNeighboursCount(index)) {
        case 2:
          if (life) {
            newGen[index] = true;
          }
          break;
        case 3:
          newGen[index] = true;
          break;
      }
    });
    return newGen;
  }

  protected loopCB(): void {
    this.lifeArray = this.nextGeneration();
    this.drawLifeArray();
  }

  public click(event: MouseEvent): void {
    const x = Math.floor(event.offsetX / this.cellSize);
    const y = Math.floor(event.offsetY / this.cellSize);
    const arrayPos = y * this.cellPerLine + x;
    this.drawLife(x, y, (this.lifeArray[arrayPos] = !this.lifeArray[arrayPos]));
  }
}
