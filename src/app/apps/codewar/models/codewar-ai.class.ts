
export const STARTING_HEALTH = 10;

export class CodewarAI {

  public readonly id: string;
  hasMoved: boolean;
  new: boolean;

  constructor(
    public readonly intel: Function,
    public readonly team = 0,
    public position: number = 0,
    public health: number = STARTING_HEALTH
  ) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.new = true;
  }

  toString(): string { return `${this.id}:${this.team}`; }

}
