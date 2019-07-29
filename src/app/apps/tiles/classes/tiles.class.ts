import { Tile } from './tile.class';
import { Canvas } from 'src/app/classes/canvas.class';
import { Utils } from 'src/app/services/utils/utils.service';

export class Tiles extends Canvas {
  public tiles: Array<Tile>;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, unitsPerLine: 10, playerOption: { timespan: 1000 } });
    this.start();
    this.init();
  }

  private newTileArray(): Array<Tile> {
    return Utils.array(Math.pow(this.unitsPerLine, 2), () => new Tile());
  }

  private init(): void {
    this.tiles = this.newTileArray();
    this.drawTiles();
  }

  private drawTile(x: number, y: number, tile: Tile): void {
    const gap = Utils.fixed(this.unitSize / this.unitsPerLine / 2, 0);

    this.render.fillStyle = tile.color;
    this.render.fillRect(
      x * this.unitSize + gap,
      y * this.unitSize + gap,
      this.unitSize - gap * 2,
      this.unitSize - gap * 2
    );
  }

  private drawTiles(): void {
    this.render.clearRect(0, 0, this.size, this.size);
    this.tiles.forEach((tile, index) =>
      this.drawTile(index % this.unitsPerLine, Math.floor(index / this.unitsPerLine), tile)
    );
  }

  onResize(): void {
    if (this.tiles) {
      this.drawTiles();
    }
  }

  onClick(x: number, y: number): void {
    const pos = Math.floor(y / this.unitSize) * this.unitsPerLine + Math.floor(x / this.unitSize);
    [
      pos - this.unitsPerLine - 1,
      pos - this.unitsPerLine,
      pos - this.unitsPerLine + 1,
      pos - 1,
      pos,
      pos + 1,
      pos + this.unitsPerLine - 1,
      pos + this.unitsPerLine,
      pos + this.unitsPerLine + 1
    ].forEach(p => {
      if (this.tiles[p]) {
        this.tiles[p].toggleStatus();
      }
    });
    this.drawTiles();
  }
}
