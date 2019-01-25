import { DIR } from './codewar-context.interface';

export enum ACTION { MOVE, DUCPLICATE, GROW, HEALTH, LOOK, THINK }

export class Action {
  constructor(public readonly name: ACTION, public readonly arg: any = DIR.RIGHT) { }
}
