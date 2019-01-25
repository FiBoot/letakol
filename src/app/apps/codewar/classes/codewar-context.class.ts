import { DIR, ICodewarContext } from '../models/codewar-context.interface';
import { EventEmitter } from '@angular/core';
import { Action, ACTION } from '../models/codewar-action.class';
import { Space } from '../models/coreware-space.class';
import { CodewarData } from '../models/codewar.data.class';

export class Context implements ICodewarContext {
  public event = new EventEmitter<Action>();
  private _data: CodewarData;

  set data(data: CodewarData) { this._data = data; }

  move(direction: DIR): void {
    this.event.emit(new Action(ACTION.MOVE, direction));
  }
  duplicate(direction: DIR): void {
    this.event.emit(new Action(ACTION.DUCPLICATE, direction));
  }
  grow(): void {
    this.event.emit(new Action(ACTION.GROW));
  }

  think(message: any): void {
    this.event.emit(new Action(ACTION.THINK, message));
  }
  look(): Array<Space> {
    return this._data.around;
  }

  get health(): number {
    return this._data.health;
  }
  get team(): number {
    return this._data.team;
  }
}
