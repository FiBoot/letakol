import { Injectable } from '@angular/core';

@Injectable()
export class Utils {
  /**
   * Generate a random color
   *
   * @static
   * @returns {string} generated color
   * @memberof Utils
   */
  public static generateColor(): string {
    return `#${Math.random().toString(16)}`;
  }

  /**
   * Return a random string id
   *
   * @static
   * @returns {string} generated id
   * @memberof Utils
   */
  public static generateId(): string {
    let id;
    do {
      id = [
        id,
        parseInt(
          Math.random()
            .toFixed(10)
            .slice(2, 12),
          10
        ).toString(36)
      ].join('');
    } while (id.length < 28);
    return id.slice(0, 28);
  }

  /**
   * Return first element of array
   *
   * @static
   * @template T
   * @param {Array<T>} arr given array
   * @returns {(T | null)} first element or null
   * @memberof Utils
   */
  public static first<T>(arr: Array<T>): T | null {
    return arr && arr.length > 0 ? arr[0] : null;
  }

  /**
   * Return last element of array
   *
   * @static
   * @template T
   * @param {Array<T>} arr given array
   * @returns {(T | null)} last element or null
   * @memberof Utils
   */
  public static last<T>(arr: Array<T>): T | null {
    return arr && arr.length > 0 ? arr[arr.length - 1] : null;
  }

  /**
   * Remove element from array
   *
   * @static
   * @template T
   * @param {Array<T>} arr given array
   * @param {T} elem element to remove
   * @returns {(T | null)} removed element
   * @memberof Utils
   */
  public static remove<T>(arr: Array<T>, elem: T): T | null {
    return arr && arr.includes(elem) ? arr.splice(arr.indexOf(elem), 1)[0] : null;
  }

  /**
   * Return random number with Math from 0 to max (excluded)
   *
   * @static
   * @param {number} max maximum possible (excluded)
   * @returns {number} randomly generated number
   * @memberof Utils
   */
  public static random(max: number): number {
    return Math.floor(Math.random() * max);
  }

  /**
   * Format decimal number, work as decimal truncate
   *
   * @static
   * @param {number} num given number
   * @param {number} [decimal=0] number of digit after decimal
   * @returns {number} rounded number
   * @memberof Utils
   */
  public static fixed(num: number, decimal: number = 0): number {
    return parseFloat(num.toFixed(decimal));
  }

  /**
   * Return the number between [min] and max
   *
   * @static
   * @param {number} num given number
   * @param {number} [max=0] maximum (0 is infinite)
   * @param {number} [min=0] minimum (0 is -infinite)
   * @returns {number} limited number
   * @memberof Utils
   */
  public static contain(num: number, max: number = 0, min: number = 0): number {
    if (min > max) {
      throw new Error(`Utils.contain error: min (${min}) > max (${max})`);
    }
    return num > min ? (max > 0 ? (num < max ? num : max) : num) : min;
  }

  /**
   * Return the cube of given number
   *
   * @static
   * @param {number} num given number
   * @returns {number} cubed number
   * @memberof Utils
   */
  public static square(num: number): number {
    return Math.pow(num, 2);
  }

  /**
   * Return sign of given number
   *
   * @static
   * @param {number} num given number
   * @returns {number} 1, -1 or 0
   * @memberof Utils
   */
  public static sign(num: number): number {
    return num > 0 ? 1 : num < 0 ? -1 : 0;
  }

  /**
   * Return locale date string of a timestamp
   *
   * @static
   * @param {number} timestamp given timestamp
   * @returns {string} locale string
   * @memberof Utils
   */
  public static timestampToLocaleDate(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
  }
}
