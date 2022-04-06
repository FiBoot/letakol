export class Coord {
  constructor(public x: number = 0, public y: number = 0, public z: number = 0) {}

  public set(x: number, y: number, z = this.z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public add(coord: Coord): Coord {
    return new Coord(this.x + coord.x, this.y + coord.y, this.z + coord.z);
  }

  public clone(): Coord {
    return new Coord(this.x, this.y, this.z);
  }

  public toString = (): string => {
    return `${this.x}, ${this.y} , ${this.z}`;
  };
}
