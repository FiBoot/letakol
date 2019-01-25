import { Component } from '@angular/core';
import { Base } from 'src/app/classes/base.class';
import { Utils } from 'src/app/services/utils/utils.service';

const BOARD_SIZE = 20;
const CASE_SIZE = 20;
const GAME_TIMEOUT = 100;
const BONUS_SPANRATE = 10;

const enum GRID { EMPTY, HEAD, BODY, TAIL, BONUS }
const enum DIR { UP, RIGHT, DOWN, LEFT }
const KEYS = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];

class Case {
  public value: GRID;
  public dir: DIR;
  constructor(v: GRID = GRID.EMPTY, d: DIR = DIR.UP) {
    this.value = v;
    this.dir = d;
  }
}

@Component({
  selector: 'app-snake-io',
  templateUrl: './snake-io.component.html',
  styleUrls: ['./snake-io.component.css']
})
export class SnakeIoComponent {

  public grid: Array<Case>;
  private gridSize: number;
  private base: Base;

  public templates: Array<string> = ['Default', 'Kappu', 'Clorus', 'Mala'];
  public template: string = Utils.first(this.templates).toLocaleLowerCase();

  private snake: Array<number>;
  private snakeDir: DIR;
  private bonuses: Array<number>;

  public score: number;
  private lose: boolean;

  constructor() {
    this.base = new Base({
      keyCallback: this.keyHandler.bind(this),
      loopCallback: this.loop.bind(this),
      preventDefaultAllKey: false,
      preventDefaultKeys: KEYS,
      timeout: GAME_TIMEOUT
    });
    this.reset();
  }

  public reset() {
    this.base.stop();
    this.lose = false;
    this.bonuses = new Array<number>();
    this.score = 0;
    this.genereGrid();
    this.genereSnake();
  }

  public start(): void {
    if (!this.lose) {
      (this.base.isRunning() ? this.base.stop.bind(this.base) : this.base.pause.bind(this.base))();
    }
  }

  public isRunning() {
    return this.base.isRunning();
  }

  public boardSize(): string {
    return `${this.gridSize * CASE_SIZE}px`;
  }

  private genereGrid(): void {
    const arr = new Array<Case>();
    for (let i = 0; i < Utils.square(BOARD_SIZE); i++) {
      arr.push(new Case);
    }
    delete this.grid;
    this.grid = arr;
    this.gridSize = BOARD_SIZE;
  }

  private genereSnake(): void {
    delete this.snake;
    this.snake = new Array<number>();
    this.snake.push(Utils.random(this.grid.length));
    this.snakeDir = Utils.random(4);

    this.grid[this.snake[0]] = new Case(GRID.HEAD, this.snakeDir);
  }

  private keyHandler(key: string, pressed: boolean): void {
    if (pressed && KEYS.includes(key)) {
      this.snakeDir = KEYS.indexOf(key);
    }
  }

  private loop(timeout: number): void {
    let next: number;
    const first = Utils.first(this.snake);
    switch (this.snakeDir) {
      case DIR.UP:
        next = first - this.gridSize;
        next = next < 0 ? next + this.grid.length : next;
        break;
      case DIR.RIGHT:
        next = first + 1;
        next = next % this.gridSize === 0 ? next - this.gridSize : next;
        break;
      case DIR.DOWN:
        next = first + this.gridSize;
        next = next > this.grid.length ? next - this.grid.length : next;
        break;
      case DIR.LEFT:
        next = first - 1;
        next = (next + 1) % this.gridSize === 0 ? next + this.gridSize : next;
        break;
      default: return console.warn('Unexpected error');
    }
    this.moveSnake(next);
    this.popBonus(timeout);
  }

  private moveSnake(next: number): void {
    const last = Utils.last(this.snake);
    if (this.bonuses.includes(Utils.first(this.snake))) {
      this.score += 10;
    }
    if (!this.bonuses.includes(last)) {
      this.grid[Utils.last(this.snake)].value = GRID.EMPTY;
      this.snake.pop();
    } else {
      Utils.remove(this.bonuses, last);
    }
    this.grid[Utils.first(this.snake)] = new Case(GRID.BODY, this.snakeDir);
    this.grid[Utils.last(this.snake)].value = GRID.TAIL;
    this.grid[next] = new Case(GRID.HEAD, this.snakeDir);

    if (this.snake.includes(next)) {
      console.warn('Lose !');
      this.base.stop();
      this.lose = true;
    }
    this.snake.unshift(next);
  }

  private popBonus(timeout: number): void {
    if (timeout % BONUS_SPANRATE === 0) {
      let rand: number, tries = 0;
      do {
        rand = Utils.random(this.grid.length);
      } while ((this.snake.includes(rand) || this.bonuses.includes(rand)) && tries++ < 10);
      this.bonuses.push(rand);
      this.grid[rand] = new Case(GRID.BONUS);
    }
  }

}
