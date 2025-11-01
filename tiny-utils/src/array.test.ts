import { describe, it, expect } from 'vitest';
import {
  chunk,
  uniq,
  uniqBy,
  groupBy,
  flatten,
  flattenDeep,
  difference,
  intersection,
  union,
} from './array';

describe('Array utilities', () => {
  describe('chunk', () => {
    it('should chunk array into smaller arrays', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should return empty array for invalid size', () => {
      expect(chunk([1, 2, 3], 0)).toEqual([]);
    });
  });

  describe('uniq', () => {
    it('should remove duplicates', () => {
      expect(uniq([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('uniqBy', () => {
    it('should remove duplicates by key', () => {
      const arr = [{ id: 1 }, { id: 2 }, { id: 1 }];
      expect(uniqBy(arr, (x) => x.id)).toEqual([{ id: 1 }, { id: 2 }]);
    });
  });

  describe('groupBy', () => {
    it('should group by key function', () => {
      const arr = [
        { type: 'a', value: 1 },
        { type: 'b', value: 2 },
        { type: 'a', value: 3 },
      ];
      expect(groupBy(arr, (x) => x.type)).toEqual({
        a: [{ type: 'a', value: 1 }, { type: 'a', value: 3 }],
        b: [{ type: 'b', value: 2 }],
      });
    });
  });

  describe('flatten', () => {
    it('should flatten one level', () => {
      expect(flatten([1, [2, 3], [4]])).toEqual([1, 2, 3, 4]);
    });
  });

  describe('flattenDeep', () => {
    it('should flatten recursively', () => {
      expect(flattenDeep([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
    });
  });

  describe('difference', () => {
    it('should return difference', () => {
      expect(difference([1, 2, 3], [2, 3])).toEqual([1]);
    });
  });

  describe('intersection', () => {
    it('should return intersection', () => {
      expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    });
  });

  describe('union', () => {
    it('should return union', () => {
      expect(union([1, 2], [2, 3])).toEqual([1, 2, 3]);
    });
  });
});

