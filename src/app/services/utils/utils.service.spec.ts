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
  
  describe('fixed', () => {});
  describe('contain', () => {});
  describe('square', () => {});
  describe('sign', () => {});
  describe('timestampToLocaleDate', () => {});
  describe('repeat', () => {});
});
