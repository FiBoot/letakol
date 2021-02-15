import { EventEmitter } from '@angular/core';
import { Canvas } from 'src/app/classes/canvas.class';
import { Utils } from 'src/app/services/utils/utils.service';
import { Token } from './token.class';

export class Board extends Canvas {
  private _tokenList: Token[] = new Array<Token>();
  private _selectedToken: Token | null = null;
  private _draggedToken: Token | null = null;

  public tokenSelected: EventEmitter<Token | null> = new EventEmitter<Token | null>();

  constructor(wrapper: HTMLDivElement) {
    super({ wrapper, name: 'void-stones rp', unitsPerLine: 15, looperOption: { timespan: 50 } });
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
          token.statusList.splice(token.statusList.indexOf(status), 1)
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
      if (Utils.isInCircle(x, y, token.coord.x, token.coord.y, this.us / 2)) {
        return token;
      }
    }
    return null;
  }

  draw(): void {
    this.clear();
    this.drawGrid();
    this.drawTokens();
  }

  private drawGrid(): void {
    for (let i = 0; i < this.upl; i++) {
      for (let j = 0; j < this.upl; j++) {
        this.drawUnit(i, j, (i + j) % 2 ? '#AAA' : '#EEE');
      }
    }
  }

  private drawTokens(): void {
    if (this._tokenList) {
      const hus = this.us / 2;
      const borderSize = Utils.fixed(this.us / 20);

      for (const token of this._tokenList) {
        const endAngle = (token.currentHp / token.maxHp) * 2 * Math.PI;
        const radius = hus - borderSize / 2;

        this.drawBackgroundToken(token, radius);

        this.render.fillStyle = token.color;
        this.render.beginPath();
        this.render.arc(token.coord.x, token.coord.y, radius, 0, endAngle);
        this.render.fill();

        if (token.selected) {
          this.drawSelectedToken(token, hus, borderSize);
        }
        this.drawTokenText(token);
      }
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
    this.render.font = `${this.us / 2}px Arial`;
    this.render.fillText(name, token.coord.x - this.us / 3, token.coord.y + this.us / 6);
  }

  private drawSelectedToken(token: Token, hus: number, bs: number): void {
    this.render.lineWidth = bs;
    this.render.strokeStyle = '#33F';
    this.render.beginPath();
    this.render.arc(token.coord.x, token.coord.y, hus, 0, 2 * Math.PI);
    this.render.stroke();
  }

  loopCB(): void {}

  onResize(): void {
    this.draw();
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
      this._draggedToken.coord.set(x, y);
      this.draw();
    }
  }
}
