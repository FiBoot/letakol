import { EventEmitter } from '@angular/core';
import { Canvas } from 'src/app/classes/canvas.class';
import { Utils } from 'src/app/services/utils/utils.service';
import { Square } from './square.class';
import { Token } from './token.class';

const MAP_SIZE = 20;
const TIMESPAN = 100;

export class Board extends Canvas {
  private _ready: Boolean = true;
  private _map: Square[] = Utils.array(Math.pow(MAP_SIZE, 2), () => new Square());
  private _tokenList: Token[] = new Array<Token>();
  private _selectedToken: Token | null = null;
  private _draggedToken: Token | null = null;

  public tokenSelected: EventEmitter<Token | null> = new EventEmitter<Token | null>();

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'void-stones rp', unitsPerLine: MAP_SIZE, looperOption: { timespan: TIMESPAN } });
    console.warn(this._map);
  }

  public newToken(): void {
    this._tokenList.push(new Token());
    this.draw();
  }

  public removeToken(token: Token): void {
    this._tokenList.splice(this._tokenList.indexOf(token), 1);
    this.selectToken(null);
    this.draw();
  }

  public nextTurn(): void {
    for (const token of this._tokenList) {
      for (const status of token.statusList) {
        status.next();
        if (status.turn < 1) {
          token.statusList.splice(token.statusList.indexOf(status), 1);
        }
      }
    }
  }

  private selectToken(token: Token | null): void {
    if (this._selectedToken) {
      this._selectedToken.selected = false;
    }
    if (token) {
      token.selected = true;
    }
    this._selectedToken = token;
    this.tokenSelected.emit(token);
    this.draw();
  }

  private getTokenOnPos(x: number, y: number): Token | null {
    for (const token of this._tokenList) {
      if (Utils.isInCircle(x, y, token.coord.x, token.coord.y, this.hus)) {
        return token;
      }
    }
    return null;
  }

  draw(): void {
    this.clear();
    this.drawGrid();
    this.drawMap();
    this.drawTokens();
  }

  private drawGrid(): void {
    // border
    this.render.lineWidth = 1;
    this.render.beginPath();
    this.render.strokeStyle = '#333';
    this.render.rect(0, 0, this.size, this.size);
    this.render.stroke();
    // lines
    for (let i = 1; i < this.upl; i++) {
      const gap = i * this.us;
      this.render.beginPath();
      this.render.moveTo(gap, 0);
      this.render.lineTo(gap, this.size);
      this.render.stroke();
      this.render.moveTo(0, gap);
      this.render.lineTo(this.size, gap);
      this.render.stroke();
    }
  }

  private drawMap(): void {
    for (const square of this._map) {
    }
  }

  private drawTokens(): void {
    const borderSize = Utils.fixed(this.us / 20);
    const gap = Utils.fixed(this.us / 15);

    for (const token of this._tokenList) {
      const percentHp = token.currentHp / token.maxHp;
      const startAngle = Math.PI / 2 - Math.PI * percentHp;
      const endAngle = Math.PI / 2 + Math.PI * percentHp;
      const radius = Math.floor(this.hus) - borderSize - gap;

      this.drawBackgroundToken(token, radius);

      this.render.fillStyle = token.color;
      this.render.beginPath();
      this.render.arc(token.coord.x, token.coord.y, radius, startAngle, endAngle);
      this.render.fill();

      if (token.selected) {
        this.drawSelectedToken(token, radius, borderSize);
      }
      this.drawTokenText(token);
    }
  }

  private drawBackgroundToken(token: Token, radius: number): void {
    this.render.fillStyle = 'rgba(50, 50, 50, 0.5)';
    this.render.beginPath();
    this.render.arc(token.coord.x, token.coord.y, radius, 0, Math.PI * 2);
    this.render.fill();
  }

  private drawTokenText(token: Token): void {
    const name = token.name.substring(0, 3);
    this.render.fillStyle = '#111';
    this.render.font = `${this.hus}px Arial`;
    this.render.fillText(name, token.coord.x - this.us / 3, token.coord.y + this.us / 6);
  }

  private drawSelectedToken(token: Token, radius: number, bs: number): void {
    this.render.lineWidth = bs;
    this.render.strokeStyle = '#0f5ff3';
    this.render.beginPath();
    this.render.arc(token.coord.x, token.coord.y, radius + bs / 2, 0, 2 * Math.PI);
    this.render.stroke();
  }

  onResize(): void {
    if (this._ready) {
      this.draw();
    }
  }

  onClick(x: number, y: number): void {
    this.selectToken(this.getTokenOnPos(x, y));
  }

  onMouse(pressed: boolean, x: number, y: number): void {
    this._draggedToken = pressed ? this.getTokenOnPos(x, y) : null;
    if (!pressed) {
      this.draw();
    }
  }

  onMouseMove(x: number, y: number): void {
    if (this._draggedToken) {
      const snapX = Math.round((x + this.hus) / this.us) * this.us - this.hus;
      const snapY = Math.round((y + this.hus) / this.us) * this.us - this.hus;
      // this._draggedToken.coord.set(x, y);
      this._draggedToken.coord.set(snapX, snapY);
      this.draw();
    }
  }
}
