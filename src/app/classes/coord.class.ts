export class Coord {
  constructor(public x: number, public y: number, public z: number = null) { }

  public set(x: number, y: number, z = this.z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public add(coord: Coord): Coord {
    return new Coord(this.x + coord.x, this.y + coord.y, this.z + coord.z);
  }

  public toString = (): string => {
    return `${this.x}, ${this.y}${this.z !== null ? `, ${this.z}` : ''}`;
  }
}
