import { Utils } from './utils.service';

describe('UtilsService', () => {
  describe('random', () => {
    it('should genere random number', () => {
      const maxRand = 1000;
      for (let i = 0; i < 1000; i++) {
        const result = Utils.random(maxRand);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(maxRand);
      }
    });
    it('should genere negative random', () => {
      const result = Utils.random(-3);
      expect(result).toBeLessThan(0);
      expect(result).toBeGreaterThanOrEqual(-3);
    });
  });

  describe('generateColor', () => {
    it('should generate color', () => {
      const result = Utils.generateColor();
      expect(/^\#[0-9a-f]{6}$/.test(result)).toBeTruthy();
    });
  });

  describe('generateId', () => {
    it('should generate id', () => {
      const result = Utils.generateId();
      expect(/^\w{28}$/.test(result)).toBeTruthy();
    });
  });

  describe('array', () => {
    it('should create an array of T', () => {
      const result = Utils.array(100, () => Math.random());
      expect(result.length).toEqual(100);
      return result.forEach(r => {
        expect(r).toBeDefined();
      });
    });
  });

  describe('first', () => {
    it('should return first elem array', () => {
      const array = ['first', 'second', 'third'];
      const result = Utils.first(array);
      expect(result).toEqual('first');
    });
    it('should return null for empty array', () => {
      const result = Utils.first([]);
      expect(result).toEqual(null);
    });
    it('should return null by default', () => {
      const result = Utils.first(null);
      expect(result).toEqual(null);
    });
  });

  describe('last', () => {
    it('should return last elem array', () => {
      const array = ['first', 'second', 'third'];
      const result = Utils.last(array);
      expect(result).toEqual('third');
    });
    it('should return null for empty array', () => {
      const result = Utils.last([]);
      expect(result).toEqual(null);
    });
    it('should return null by default', () => {
      const result = Utils.last(null);
      expect(result).toEqual(null);
    });
  });

  describe('remove', () => {
    it('should remove elem from array', () => {
      const array = ['banana', 'peer', 'mabite', 'watermelon'];
      const result = Utils.remove(array, 'mabite');
      expect(result).toEqual('mabite');
      expect(array).toEqual(['banana', 'peer', 'watermelon']);
    });
    it('should not remove unknown elem', () => {
      const array = ['banana', 'peer', 'mabite', 'watermelon'];
      const result = Utils.remove(array, 'mysex');
      expect(result).toEqual(null);
      expect(array).toEqual(['banana', 'peer', 'mabite', 'watermelon']);
    });
    it('should do nothing on empty array', () => {
      const result = Utils.remove([], 'truc');
      expect(result).toEqual(null);
    });
  });

  describe('fixed', () => {
    it('should \'fix\' number', () => {
      let result = Utils.fixed(124.6589, 2);
      expect(result).toEqual(124.66);
      result = Utils.fixed(124.6589, 0);
      expect(result).toEqual(125);
    });
  });

  describe('reduce', () => {
    it('should reduce overhead value', () => {
      const result = Utils.reduce(123, 100, 0);
      expect(result).toEqual(100);
    });
    it('should reduce lowerhead value', () => {
      const result = Utils.reduce(123, 1001, 999);
      expect(result).toEqual(999);
    });
    it('should throw error when min > max', () => {
      try {
        Utils.reduce(100, 10, 50);
      } catch (e) {
        expect(e.message).toEqual(`Utils.contain error: min (50) > max (10)`);
      }
    });
  });

  describe('sign', () => {
    it('should return 1 to positive number', () => {
      const result = Utils.sign(465);
      expect(result).toEqual(1);
    });
    it('should return -1 to negative number', () => {
      const result = Utils.sign(-33);
      expect(result).toEqual(-1);
    });
    it('should return 0 to zero number', () => {
      const result = Utils.sign(0);
      expect(result).toEqual(0);
    });
  });

  describe('timestampToLocaleDate', () => {
    it('should return local date from timestamp', () => {
      const result = Utils.timestampToLocaleDate(1600000000000);
      expect(result).toEqual('13/09/2020 à 14:26:40');
    });
  });

  describe('repeat', () => {
    it('should repeat x times given function', () => {
      let count = 0;
      const func = () => (count += 1);
      const result = Utils.repeat(func, 10);
      expect(count).toEqual(10);
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });
});
