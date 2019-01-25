import { Space } from './coreware-space.class';

export enum DIR { RIGHT, DOWN, LEFT, UP }

export interface ICodewarContext {

  // ACTIONS

  // moves to given direction
  // fail if the direction is not empty
  move(direction: DIR): void;

  // duplicates to the given direction
  // halves current health and create a copy of itself
  // fail if the direction is not empty or health is not divisible (<= 1)
  // floor health division (ex: 3 -> 1 + 1)
  duplicate(direction: DIR): void;

  // gain 3 hp
  grow(): void;


  // SENSES

  // look around, return an array of the 4 adjacent spaces
  // as [RIGHT, DOWN, LEFT, UP]
  look(): Array<Space>;

  // default log function
  think(message: any): void;
}
