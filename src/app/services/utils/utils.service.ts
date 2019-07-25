import { Injectable } from '@angular/core';

@Injectable()
export class Utils {
  /**
   * Generate a random color
   *
   * @returns {string} generated color
   */
  public static generateColor(): string {
    return `#${Math.random().toString(16)}`;
  }

  /**
   * Return a random string id
   *
   * @returns generated id
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
   * Create an array of {size} from {factory} item
   *
   * @param {number} size size of the array
   * @param {() => T} factory arry item factory
   * @returns {Array<T>} built array
   */
  public static array<T>(size: number, factory: () => T): Array<T> {
    const arr = new Array<T>();
    for (; size > 0; size--) {
      arr.push(factory());
    }
    return arr;
  }

  /**
   * Return first element of array
   *
   * @param {Array<T>} arr array
   * @returns {T | null} first element or null
   */
  public static first<T>(arr: Array<T>): T | null {
    return arr && arr.length > 0 ? arr[0] : null;
  }

  /**
   * Return last element of array
   *
   * @param {Array<T>} arr array
   * @returns {T | null} last element or null
   */
  public static last<T>(arr: Array<T>): T | null {
    return arr && arr.length > 0 ? arr[arr.length - 1] : null;
  }

  /**
   * Remove element from array
   *
   * @param {Array<T>} from array
   * @param {T} elem element to remove
   * @returns {T | null} removed element
   */
  public static remove<T>(arr: Array<T>, elem: T): T | null {
    return arr && arr.includes(elem) ? arr.splice(arr.indexOf(elem), 1)[0] : null;
  }

  /**
   * Return random number with Math from 0 to max (excluded)
   *
   * @param {number} max max random possible
   * @returns {number} random number
   */
  public static random(max: number): number {
    return Math.floor(Math.random() * max);
  }

  /**
   * Format float number to a fixed decimal, will truncate last digit
   *
   * @param {number} num number to format
   * @param {number} decimal [=0] number of digit after decimal
   * @returns {number} rounded number
   */
  public static fixed(num: number, decimal: number = 0): number {
    return parseFloat(num.toFixed(decimal));
  }

  /**
   * Return the number between limit 0 - max
   *
   * @static
   * @param {number} num
   * @param {number} [max=0]
   * @param {number} [min=0]
   * @returns {number}
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
   * @param {number} num given number
   * @returns {number} cube of given number
   */
  public static square(num: number): number {
    return Math.pow(num, 2);
  }

  /**
   * Return sign of given number
   *
   * @param {number} num given number
   * @returns {1 | -1 | 0} 1, -1 or 0
   */
  public static sign(num: number): 1 | -1 | 0 {
    return num > 0 ? 1 : num < 0 ? -1 : 0;
  }

  /**
   * Return locale date string of a timestamp
   *
   * @param {number} timestamp date timestamp
   * @returns {string} locale string
   */
  public static timestampToLocaleDate(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
  }

  /**
   * Repeat a given function x times
   * Return all results in an Array
   *
   * @param {() => { any }} func
   * @param {number} [times=1]
   * @returns {Array<any>}
   */
  public static repeat(func: () => { any }, times: number = 1): Array<any> {
    if (times < 1) {
      throw new Error(
        `Utils.repeat: Can\'t repeat function ${times} times (number must be positive)`
      );
    }
    const results: Array<any> = new Array<any>();
    for (let i = 0; i < times; i++) {
      results.push(func());
    }
    return results;
  }
}
