import { Utils } from 'src/app/services/utils/utils.service';

const VELOCITY_COEF = 2;

export class Orb {
  readonly id: string = Utils.generateId();

  constructor(
    public x: number,
    public y: number,
    public velocity: { x: number; y: number } = { x: 0, y: 0 },
    public radius: number = 1,
    public mass: number = 1
  ) {}

  public process(): void {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  public contain(x: number, y: number): boolean {
    return Math.sqrt(Utils.square(x - this.x) + Utils.square(y - this.y)) < this.radius
  }

  public toString(): string {
    return `${this.id} [${this.x}, ${this.y}]`;
  }
}