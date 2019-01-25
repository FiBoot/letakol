import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/services/utils/utils.service';
import { Grids } from './grid.data';

class Num {
  public value: number;
  public editable: boolean;
  public valid: boolean;

  constructor(value: number = null) {
    this.value = value;
    this.editable = value ? false : true;
    this.valid = true;
  }
}

const GRID_SIZE = 9;

@Component({
  selector: 'app-num-grid',
  templateUrl: './num-grid.component.html',
  styleUrls: ['./num-grid.component.css']
})
export class NumGridComponent {

  public grid: Array<Array<Num>>;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.buildGrid(Grids[Utils.random(Grids.length)]);
  }

  public changeNum(num: Num, val: string): void {
    num.value = val ? parseInt(val, 10) : null;
  }

  public checkGrid(): void {
    let arr = new Array<Num>();
    this.grid.forEach(line => arr = arr.concat(line));
    this.setValidity(arr);

    for (let index = 0; index < GRID_SIZE; index++) {

      this.checkNumArr(this.grid[index]);

      let column = new Array<Num>();
      this.grid.forEach(line => column = column.concat(line[index]));
      this.checkNumArr(column);

      const size = Math.sqrt(GRID_SIZE);
      const l = Math.floor(index / size) * size;
      const c = index % size * size;
      const block = new Array<Num>();
      for (let y = l; y < l + 3; y++) {
        for (let x = c; x < c + 3; x++) {
          block.push(this.grid[y][x]);
        }
      }
      this.checkNumArr(block);
    }
  }

  private checkNumArr(arr: Array<Num>): boolean {
    const check = new Array<number>();
    arr.forEach(num => {
      if (check.includes(num.value)) {
        this.setValidity(arr, false);
        return false;
      }
      if (num.value) {
        check.push(num.value);
      }
    });
    return true;
  }

  private setValidity(grid: Array<Num>, valid: boolean = true): void {
    grid.forEach(num => num.valid = valid);
  }

  private buildGrid(grid: Array<number>): void {
    this.grid = new Array<Array<Num>>();
    for (let y = 0; y < GRID_SIZE; y++) {
      const line = new Array<Num>();
      for (let x = 0; x < GRID_SIZE; x++) {
        const num = grid[y * GRID_SIZE + x];
        line.push(new Num(num ? num : null));
        // line.push(!Utils.random(5) ? new Num(Utils.random(GRID_SIZE) + 1, false) : new Num);
      }
      this.grid.push(line);
    }
    console.log(this.grid);
  }

}
