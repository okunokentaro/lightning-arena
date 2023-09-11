import { describe, test, expect } from 'vitest';
import { calcTimetable } from './calc-timetable';

type Arena = Parameters<typeof calcTimetable>[0];
type Entries = Parameters<typeof calcTimetable>[1];

const min = 60 * 1000;

describe('calcTimetable()', () => {
  describe('一人のとき', () => {
    const arena = {
      firstPresentationStartTime: new Date('1970-01-01T00:00:00Z').valueOf(),
      break: null,
    } as const satisfies Arena;

    test('case 01', () => {
      const expected = [
        {
          type: 'presentation',
          entryId: '1',
          endAt: new Date('1970-01-01T00:05:00Z').valueOf(),
        },
      ] as const satisfies ReturnType<typeof calcTimetable>;

      const entries = [
        { id: '1', duration: 5 * min },
      ] as const satisfies Entries;

      const actual = calcTimetable(arena, entries);
      expect(actual).toEqual(expected);
    });

    test('case 02', () => {
      const expected = [
        {
          type: 'presentation',
          entryId: '1',
          endAt: new Date('1970-01-01T00:10:00Z').valueOf(),
        },
      ] as const satisfies ReturnType<typeof calcTimetable>;

      const entries = [
        { id: '1', duration: 10 * min },
      ] as const satisfies Entries;

      const actual = calcTimetable(arena, entries);
      expect(actual).toEqual(expected);
    });
  });
});
