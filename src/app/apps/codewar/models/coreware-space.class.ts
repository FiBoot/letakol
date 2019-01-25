import { CodewarAI } from './codewar-ai.class';

export class Space {
  constructor(
    private empty: boolean,
    private enemy: boolean = false,
    readonly health: number = 0
  ) { }

  public isEmpty() { return this.empty; }
  public isEnemy() { return this.enemy; }
}

export class Empty extends Space {
  constructor() {
    super(true);
  }
}

export class Ally extends Space {
  constructor(ai: CodewarAI) {
    super(false, false, ai.health);
  }
}

export class Enemy extends Space {
  constructor(ai: CodewarAI) {
    super(false, true, ai.health);
  }
}
