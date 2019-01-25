import { CodewarAI } from './codewar-ai.class';
import { Space } from './coreware-space.class';

export class CodewarData {

  readonly health: number;
  readonly team: number;
  // readonly id: string;

  constructor(ai: CodewarAI, readonly around: Array<Space>) {
    this.health = ai.health;
    this.team = ai.team;
  }
}
