import { Action, ACTION } from '../models/codewar-action.class';
import { CodewarAI } from '../models/codewar-ai.class';
import { DIR } from '../models/codewar-context.interface';
import { CodewarConfig } from '../models/codewar.configuration';
import { CodewarData } from '../models/codewar.data.class';
import { Ally, Empty, Enemy, Space } from '../models/coreware-space.class';
import { Context } from './codewar-context.class';
import { EventEmitter } from '@angular/core';
import { LOG_LEVEL, Logs } from 'src/app/classes/logs.class';
import { Utils } from 'src/app/services/utils/utils.service';

const TEAM_COLORS = ['#00bfff', '#ed143d', '#3cb371', '#ffa500', '#ff69b4'];

export class Codewar {

  private readonly CELL_SIZE: number;
  public readonly end = new EventEmitter<void>();

  public Logs = new Logs;
  private AIs: Array<CodewarAI> = new Array<CodewarAI>();
  private Context: Context = new Context;
  private currentAI: CodewarAI;


  constructor(private ctx: CanvasRenderingContext2D, readonly CANVAS_SIZE: number = 500) {
    this.Context.event.subscribe(this.AIAction.bind(this));

    this.CELL_SIZE = CANVAS_SIZE / CodewarConfig.MAP_LENGTH;
    this.ctx.font = `bolder ${(this.CELL_SIZE / 4)}px Trebuchet MS`;
    this.ctx.textAlign = 'center';
  }

  public reset(): void {
    this.Logs.reset();
    this.AIs = new Array<CodewarAI>();
  }

  public addAI(intel: Function, team: number = 0): void {
    let randPos, tries = 0;
    do {
      randPos = Utils.random(Math.pow(CodewarConfig.MAP_LENGTH, 2));
    } while (tries++ < CodewarConfig.MAX_ADDIA_TRY && this.getUnitInPosition(randPos));
    if (tries === CodewarConfig.MAX_ADDIA_TRY) {
      return this.Logs.addLogMessage(`Couldn't place AI on board after ${tries} tries`, LOG_LEVEL.ERROR);
    }
    this.AIs.push(new CodewarAI(intel, team, randPos));
    this.draw();
  }

  public next(): void {
    this.AIs.slice(0).forEach(ai => {
      this.currentAI = ai;
      this.currentAI.hasMoved = false;
      this.currentAI.new = false;
      try {
        // TODO: type?
        this.Context.data = new CodewarData(this.currentAI, this.getAround(this.currentAI));
        (<any>ai.intel).playTurn(this.Context);
      } catch (e) {
        this.Logs.addLogMessage(`Error executing AI turn: ${e.message}`, LOG_LEVEL.ERROR);
        console.warn(e);
      }
    });
    this.checkEnd();
  }

  public draw(): void {
    this.ctx.clearRect(0, 0, this.CANVAS_SIZE, this.CANVAS_SIZE);
    this.AIs.slice(0).forEach(this.drawIA.bind(this));
  }

  private drawIA(ai: CodewarAI): void {
    const gap = ai.new ? this.CELL_SIZE / 4 : 1,
      x = (ai.position % CodewarConfig.MAP_LENGTH) * this.CELL_SIZE,
      y = Math.floor(ai.position / CodewarConfig.MAP_LENGTH) * this.CELL_SIZE;
    // rect
    this.ctx.fillStyle = TEAM_COLORS[ai.team] || 'grey';
    this.ctx.fillRect(x + gap, y + gap, this.CELL_SIZE - (gap * 2), this.CELL_SIZE - (gap * 2));
    this.ctx.stroke();
    // name
    this.ctx.fillStyle = '#111';
    this.ctx.fillText(ai.toString().slice(0, 5), x + (this.CELL_SIZE / 2), y + (this.CELL_SIZE / 4));
    // health
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(`${ai.health}`, x + (this.CELL_SIZE / 2), y + (this.CELL_SIZE * 3 / 5));
  }

  private AIAction(action: Action): void {
    const possibleActions = [this.move.bind(this), this.duplicate.bind(this), this.grow.bind(this)];
    if (action.name === ACTION.THINK) {
      this.Logs.addLogMessage(`${this.currentAI} thinks: ${action.arg.toString()}`);
    } else {
      if (this.currentAI.hasMoved) {
        this.Logs.addLogMessage(`AI ${this.currentAI} has already moved`, LOG_LEVEL.WARN);
      } else {
        this.currentAI.hasMoved = true;
        possibleActions[action.name](this.currentAI, action.arg);
      }
    }
  }

  private checkEnd(): void {
    if (this.AIs.length <= 0) {
      this.Logs.addLogMessage('DRAW !', LOG_LEVEL.INFO);
      this.end.emit();
    } else {
      const team = Utils.first(this.AIs).team;
      if (this.AIs.filter(ai => ai.team === team).length === this.AIs.length) {
        this.Logs.addLogMessage(`END ! Team ${team} wins`, LOG_LEVEL.INFO);
        this.end.emit();
      }
    }
  }

  private getAround(ai: CodewarAI): Array<Space> {
    const around = new Array<Space>();
    [DIR.RIGHT, DIR.DOWN, DIR.LEFT, DIR.UP]
      .map(dir => this.getNextPosition(ai.position, dir))
      .map(pos => this.getUnitInPosition(pos))
      .forEach(unit => around.push(unit ? (unit.team === ai.team) ? new Ally(unit) : new Enemy(unit) : new Empty));
    return around;
  }

  private getNextPosition(position: number, direction: DIR): number {
    let next: number;
    switch (direction) {
      case DIR.RIGHT: next = (position + 1) % CodewarConfig.MAP_LENGTH === 0
        ? (position + 1) - CodewarConfig.MAP_LENGTH : position + 1;
        break;
      case DIR.DOWN: next = position + CodewarConfig.MAP_LENGTH > Math.pow(CodewarConfig.MAP_LENGTH, 2)
        ? position % CodewarConfig.MAP_LENGTH : position + CodewarConfig.MAP_LENGTH;
        break;
      case DIR.LEFT: next = position % CodewarConfig.MAP_LENGTH === 0
        ? (position - 1) + CodewarConfig.MAP_LENGTH : position - 1;
        break;
      case DIR.UP: next = position - CodewarConfig.MAP_LENGTH < 0
        ? (position - CodewarConfig.MAP_LENGTH) + Math.pow(CodewarConfig.MAP_LENGTH, 2) : position - CodewarConfig.MAP_LENGTH;
        break;
    }
    return next;
  }

  private getUnitInPosition(position: number): CodewarAI {
    return Utils.first(this.AIs.filter(ai => ai.position === position));
  }

  private damageAI(ai: CodewarAI, damage: number): void {
    if (damage > 0) {
      if ((ai.health -= damage) <= 0) {
        this.AIs.splice(this.AIs.indexOf(ai), 1);
      }
    }
  }

  private AIClash(ai1: CodewarAI, ai2: CodewarAI, action: ACTION): void {
    if (ai1.team === ai2.team) {
      this.Logs.addLogMessage(`${ai1} couldn't ${['move', 'duplicate'][action]}, an ally is in the way (${ai2})`, LOG_LEVEL.WARN);
    } else {
      this.Logs.addLogMessage(`${ai1} (${ai1.health}) clashing with ${ai2} (${ai2.health})`);
      const ai1Health = ai1.health;
      this.damageAI(ai1, ai2.health);
      this.damageAI(ai2, ai1Health);
    }
  }

  private move(ai: CodewarAI, direction: DIR): void {
    const next = this.getNextPosition(ai.position, direction);
    const unit = this.getUnitInPosition(next);
    if (unit) {
      this.AIClash(ai, unit, ACTION.MOVE);
    } else {
      ai.position = next;
    }
  }

  private duplicate(ai: CodewarAI, direction: DIR): void {
    if (ai.health > 1) {
      const next = this.getNextPosition(ai.position, direction);
      const unit = this.getUnitInPosition(next);
      if (unit) {
        this.AIClash(ai, unit, ACTION.DUCPLICATE);
      } else {
        ai.health = Math.floor(ai.health / 2);
        ai.new = true;
        this.AIs.push(new CodewarAI(ai.intel, ai.team, next, ai.health));
      }
    } else {
      this.Logs.addLogMessage(`${ai} cannot duplicate, not enought health`, LOG_LEVEL.WARN);
    }
  }

  private grow(ai: CodewarAI): void {
    ai.health += 3;
  }

}
