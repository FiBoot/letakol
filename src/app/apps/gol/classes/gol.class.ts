import { Player } from 'src/app/classes/player.class';
import { Utils } from 'src/app/services/utils/utils.service';

const DEFAULT_TIMESPAN = 100;
const DEAD_CELL_COLORS = '#FAFAFA';
const ALIVE_CELL_COLORS = [
  '#333333',
  '#800000',
  '#FF0000',
  '#FFA500',
  '#FFFF00',
  '#808000',
  '#008000',
  '#800080',
  '#FF00FF',
  '#00FF00',
  '#008080',
  '#00FFFF',
  '#0000FF',
  '#000080'
];

class Cell {
  constructor(public cycle: number = 0) {}
}

export class GameOfLife extends Player {
  private cellArray: Array<Cell>;
  private cellSize: number;

  constructor(
    private render: CanvasRenderingContext2D,
    readonly canvasSize: number,
    readonly cellPerLine: number,
    readonly timespan: number = DEFAULT_TIMESPAN
  ) {
    super(timespan);
    this.cellSize = Utils.fixed(canvasSize / cellPerLine);

    this.stops.subscribe(_ => this.init());
    this.init();
  }

  private newCellArray(): Array<Cell> {
    const arr = new Array<Cell>();
    for (let i = 0; i < Utils.square(this.cellPerLine); i++) {
      arr.push(null);
    }
    return arr;
  }

  private init(): void {
    this.cellArray = this.newCellArray();
    this.drawCellArray();
  }

  private drawCellArray(): void {
    this.render.clearRect(0, 0, this.canvasSize, this.canvasSize);
    this.cellArray.forEach((cell, index) => {
      this.drawCell(index % this.cellPerLine, Math.floor(index / this.cellPerLine), cell);
    });
  }

  private drawCell(x: number, y: number, cell: Cell): void {
    const gap = Utils.fixed(this.cellSize / this.cellPerLine, 1);
    this.render.fillStyle = cell
      ? ALIVE_CELL_COLORS[
          cell.cycle < ALIVE_CELL_COLORS.length ? cell.cycle : ALIVE_CELL_COLORS.length - 1
        ]
      : DEAD_CELL_COLORS;
    this.render.fillRect(
      x * this.cellSize + gap,
      y * this.cellSize + gap,
      this.cellSize - gap * 2,
      this.cellSize - gap * 2
    );
    if (cell) {
      this.render.fillStyle = DEAD_CELL_COLORS;
      this.render.fillText(
        cell.cycle.toString(),
        x * this.cellSize + this.cellSize / 3,
        y * this.cellSize + (this.cellSize * 2) / 3
      );
    }
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
    ].forEach(neighbours => (aliveNeighbours += this.cellArray[index + neighbours] ? 1 : 0));
    return aliveNeighbours;
  }

  private increaseCellCycle(cell: Cell): Cell {
    cell.cycle += 1;
    return cell;
  }

  private nextGeneration(): Array<Cell> {
    const newGen = this.newCellArray();
    this.cellArray.forEach((cell, index) => {
      switch (this.getAliveNeighboursCount(index)) {
        case 2:
          if (cell) {
            newGen[index] = this.increaseCellCycle(cell);
          }
          break;
        case 3:
          newGen[index] = cell ? this.increaseCellCycle(cell) : new Cell();
          break;
      }
    });
    return newGen;
  }

  protected loopCB(): void {
    this.cellArray = this.nextGeneration();
    this.drawCellArray();
  }

  public click(event: MouseEvent): void {
    const x = Math.floor(event.offsetX / this.cellSize);
    const y = Math.floor(event.offsetY / this.cellSize);
    const arrayPos = y * this.cellPerLine + x;
    this.cellArray[arrayPos] = this.cellArray[arrayPos] ? null : new Cell();
    this.drawCell(x, y, this.cellArray[arrayPos]);
  }
}
