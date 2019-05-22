import { map1 } from '../maps/map1';
import { COLORS, Element } from './elements.enum';
import { Canvas } from 'src/app/classes/canvas.class';

export class BomberLan extends Canvas {
  private _map: Array<Array<Element>> = map1;

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, unitsPerLine: map1.length });

    this.start();
  }

  loopCB(): void {
    this.drawMap();
  }

  onResize(): void {
    this.drawMap();
  }

  private drawMap(): void {
    this.clear();
    for (let y = 0; y < this._map.length; y++) {
      for (let x = 0; x < this._map[y].length; x++) {
        this.drawElement(this._map[y][x], x, y);
      }
    }
  }

  private drawElement(elem: Element, x: number, y: number): void {
    this.render.fillStyle = COLORS[elem];
    this.render.fillRect(this.u(x), this.u(y), this.unitSize, this.unitSize);
  }
}
