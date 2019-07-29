export enum TILE_STATUS {
  INACTIVE = 0,
  ACTIVE
}
export const TILE_COLOR = ['#EEE', '#333'];

export class Tile {
  constructor(public status: TILE_STATUS = TILE_STATUS.INACTIVE, public needed: boolean = false) {}

  get color(): string {
    return TILE_COLOR[this.status];
  }

  toggleStatus(): void {
    this.status = this.status === TILE_STATUS.INACTIVE ? TILE_STATUS.ACTIVE : TILE_STATUS.INACTIVE;
  }
}
