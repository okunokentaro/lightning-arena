import { describe, test, expect } from 'vitest';
import { calcTimetable } from './calc-timetable';

type Arena = Parameters<typeof calcTimetable>[0];
type Entries = Parameters<typeof calcTimetable>[1];

describe('calcTimetable()', () => {
  describe('duration を足して endAt が計算された配列が返る', () => {
    const arena = {
      firstPresentationStartTime: new Date('1970-01-01T00:00:00Z').valueOf(),
      breakConfig: null,
    } as const satisfies Arena;

    (
      [
        {
          expected: [{ type: 'presentation', entryId: '1', endAt: 1 }],
          entries: [{ id: '1', duration: 1 }],
        },
        {
          expected: [
            { type: 'presentation', entryId: '1', endAt: 1 },
            { type: 'presentation', entryId: '2', endAt: 2 },
          ],
          entries: [
            { id: '1', duration: 1 },
            { id: '2', duration: 1 },
          ],
        },
        {
          expected: [
            { type: 'presentation', entryId: '1', endAt: 2 },
            { type: 'presentation', entryId: '2', endAt: 5 },
            { type: 'presentation', entryId: '3', endAt: 10 },
            { type: 'presentation', entryId: '4', endAt: 17 },
          ],
          entries: [
            { id: '1', duration: 2 },
            { id: '2', duration: 3 },
            { id: '3', duration: 5 },
            { id: '4', duration: 7 },
          ],
        },
      ] as const satisfies readonly {
        expected: ReturnType<typeof calcTimetable>;
        entries: Entries;
      }[]
    ).forEach(({ expected, entries }, i) => {
      test(`${i}`, () => {
        const actual = calcTimetable(arena, entries);
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('休憩設定で指定した interval が経過したら休憩が挿入される', () => {
    (
      [
        {
          expected: [{ type: 'presentation', entryId: '1', endAt: 1 }],
          entries: [{ id: '1', duration: 1 }],
          interval: 1,
        },
        {
          expected: [
            { type: 'presentation', entryId: '1', endAt: 1 },
            { type: 'break', endAt: 2 },
            { type: 'presentation', entryId: '2', endAt: 3 },
          ],
          entries: [
            { id: '1', duration: 1 },
            { id: '2', duration: 1 },
          ],
          interval: 1,
        },
        {
          expected: [
            { type: 'presentation', entryId: '1', endAt: 1 },
            { type: 'break', endAt: 2 },
            { type: 'presentation', entryId: '2', endAt: 3 },
            { type: 'break', endAt: 4 },
            { type: 'presentation', entryId: '3', endAt: 5 },
            { type: 'break', endAt: 6 },
            { type: 'presentation', entryId: '4', endAt: 7 },
          ],
          entries: [
            { id: '1', duration: 1 },
            { id: '2', duration: 1 },
            { id: '3', duration: 1 },
            { id: '4', duration: 1 },
          ],
          interval: 1,
        },
        {
          expected: [
            { type: 'presentation', entryId: '1', endAt: 1 },
            { type: 'presentation', entryId: '2', endAt: 2 },
            { type: 'break', endAt: 3 },
            { type: 'presentation', entryId: '3', endAt: 4 },
            { type: 'presentation', entryId: '4', endAt: 5 },
          ],
          entries: [
            { id: '1', duration: 1 },
            { id: '2', duration: 1 },
            { id: '3', duration: 1 },
            { id: '4', duration: 1 },
          ],
          interval: 2,
        },
        {
          expected: [
            { type: 'presentation', entryId: '1', endAt: 1 },
            { type: 'presentation', entryId: '2', endAt: 2 },
            { type: 'presentation', entryId: '3', endAt: 3 },
            { type: 'break', endAt: 4 },
            { type: 'presentation', entryId: '4', endAt: 5 },
          ],
          entries: [
            { id: '1', duration: 1 },
            { id: '2', duration: 1 },
            { id: '3', duration: 1 },
            { id: '4', duration: 1 },
          ],
          interval: 3,
        },
      ] as const satisfies readonly {
        expected: ReturnType<typeof calcTimetable>;
        entries: Entries;
        interval: NonNullable<Arena['breakConfig']>['interval'];
      }[]
    ).forEach(({ expected, entries, interval }, i) => {
      test(`${i}`, () => {
        const arena = {
          firstPresentationStartTime: new Date(
            '1970-01-01T00:00:00Z',
          ).valueOf(),
          breakConfig: { interval, duration: 1, mandatoryBreakEvery: null },
        } as const satisfies Arena;

        const actual = calcTimetable(arena, entries);
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('実際のユースケース', () => {
    const min = 60 * 1000;

    describe('一人のとき', () => {
      test('case 01', () => {
        const expected = [
          {
            type: 'presentation',
            entryId: '1',
            endAt: new Date('1970-01-01T00:05:00Z').valueOf(),
          },
        ] as const satisfies ReturnType<typeof calcTimetable>;

        const arena = {
          firstPresentationStartTime: new Date(
            '1970-01-01T00:00:00Z',
          ).valueOf(),
          breakConfig: null,
        } as const satisfies Arena;

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
            entryId: '2',
            endAt: new Date('1970-01-01T01:00:00Z').valueOf(),
          },
        ] as const satisfies ReturnType<typeof calcTimetable>;

        const arena = {
          firstPresentationStartTime: new Date(
            '1970-01-01T00:00:00Z',
          ).valueOf(),
          breakConfig: null,
        } as const satisfies Arena;

        const entries = [
          { id: '2', duration: 60 * min },
        ] as const satisfies Entries;

        const actual = calcTimetable(arena, entries);
        expect(actual).toEqual(expected);
      });
    });

    describe('複数人のとき', () => {
      test('タイムテーブルを作成できる', () => {
        const expected = [
          {
            type: 'presentation',
            entryId: '1',
            endAt: new Date('1970-01-01T00:03:00Z').valueOf(),
          },
          {
            type: 'presentation',
            entryId: '2',
            endAt: new Date('1970-01-01T00:08:00Z').valueOf(),
          },
        ] as const satisfies ReturnType<typeof calcTimetable>;

        const arena = {
          firstPresentationStartTime: new Date(
            '1970-01-01T00:00:00Z',
          ).valueOf(),
          breakConfig: null,
        } as const satisfies Arena;

        const entries = [
          { id: '1', duration: 3 * min },
          { id: '2', duration: 5 * min },
        ] as const satisfies Entries;

        const actual = calcTimetable(arena, entries);
        expect(actual).toEqual(expected);
      });

      describe('休憩を挿入する', () => {
        test('case 01', () => {
          const expected = [
            {
              type: 'presentation',
              entryId: '1',
              endAt: new Date('1970-01-01T00:10:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '2',
              endAt: new Date('1970-01-01T00:20:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '3',
              endAt: new Date('1970-01-01T00:30:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '4',
              endAt: new Date('1970-01-01T00:40:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '5',
              endAt: new Date('1970-01-01T00:50:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '6',
              endAt: new Date('1970-01-01T01:00:00Z').valueOf(),
            },
            {
              type: 'break',
              endAt: new Date('1970-01-01T01:10:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '7',
              endAt: new Date('1970-01-01T01:20:00Z').valueOf(),
            },
          ] as const satisfies ReturnType<typeof calcTimetable>;

          const arena = {
            firstPresentationStartTime: new Date(
              '1970-01-01T00:00:00Z',
            ).valueOf(),
            breakConfig: null,
          } as const satisfies Arena;

          const entries = [
            { id: '1', duration: 10 * min },
            { id: '2', duration: 10 * min },
            { id: '3', duration: 10 * min },
            { id: '4', duration: 10 * min },
            { id: '5', duration: 10 * min },
            { id: '6', duration: 10 * min },
            { id: '7', duration: 10 * min },
          ] as const satisfies Entries;

          const actual = calcTimetable(
            {
              ...arena,
              breakConfig: {
                interval: 60 * min,
                mandatoryBreakEvery: 60 * min,
                duration: 10 * min,
              },
            },
            entries,
          );
          expect(actual).toEqual(expected);
        });

        test('case 02', () => {
          const expected = [
            {
              type: 'presentation',
              entryId: '1',
              endAt: new Date('1970-01-01T00:10:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '2',
              endAt: new Date('1970-01-01T00:20:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '3',
              endAt: new Date('1970-01-01T00:30:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '4',
              endAt: new Date('1970-01-01T00:40:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '5',
              endAt: new Date('1970-01-01T00:50:00Z').valueOf(),
            },
            {
              type: 'break',
              endAt: new Date('1970-01-01T01:00:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '6',
              endAt: new Date('1970-01-01T01:10:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '7',
              endAt: new Date('1970-01-01T01:20:00Z').valueOf(),
            },
          ] as const satisfies ReturnType<typeof calcTimetable>;

          const arena = {
            firstPresentationStartTime: new Date(
              '1970-01-01T00:00:00Z',
            ).valueOf(),
            breakConfig: null,
          } as const satisfies Arena;

          const entries = [
            { id: '1', duration: 10 * min },
            { id: '2', duration: 10 * min },
            { id: '3', duration: 10 * min },
            { id: '4', duration: 10 * min },
            { id: '5', duration: 10 * min },
            { id: '6', duration: 10 * min },
            { id: '7', duration: 10 * min },
          ] as const satisfies Entries;

          const actual = calcTimetable(
            {
              ...arena,
              breakConfig: {
                interval: 50 * min,
                mandatoryBreakEvery: 50 * min,
                duration: 10 * min,
              },
            },
            entries,
          );
          expect(actual).toEqual(expected);
        });
      });

      test('休憩を2度以上挿入する', () => {
        const expected = [
          {
            type: 'presentation',
            entryId: '1',
            endAt: new Date('1970-01-01T00:01:00Z').valueOf(),
          },
          {
            type: 'presentation',
            entryId: '2',
            endAt: new Date('1970-01-01T00:02:00Z').valueOf(),
          },
          {
            type: 'break',
            endAt: new Date('1970-01-01T00:03:00Z').valueOf(),
          },
          {
            type: 'presentation',
            entryId: '3',
            endAt: new Date('1970-01-01T00:04:00Z').valueOf(),
          },
          {
            type: 'presentation',
            entryId: '4',
            endAt: new Date('1970-01-01T00:05:00Z').valueOf(),
          },
          {
            type: 'break',
            endAt: new Date('1970-01-01T00:06:00Z').valueOf(),
          },
          {
            type: 'presentation',
            entryId: '5',
            endAt: new Date('1970-01-01T00:07:00Z').valueOf(),
          },
          {
            type: 'presentation',
            entryId: '6',
            endAt: new Date('1970-01-01T00:08:00Z').valueOf(),
          },
          {
            type: 'break',
            endAt: new Date('1970-01-01T00:09:00Z').valueOf(),
          },
          {
            type: 'presentation',
            entryId: '7',
            endAt: new Date('1970-01-01T00:10:00Z').valueOf(),
          },
        ] as const satisfies ReturnType<typeof calcTimetable>;

        const arena = {
          firstPresentationStartTime: new Date(
            '1970-01-01T00:00:00Z',
          ).valueOf(),
          breakConfig: null,
        } as const satisfies Arena;

        const entries = [
          { id: '1', duration: min },
          { id: '2', duration: min },
          { id: '3', duration: min },
          { id: '4', duration: min },
          { id: '5', duration: min },
          { id: '6', duration: min },
          { id: '7', duration: min },
        ] as const satisfies Entries;

        const actual = calcTimetable(
          {
            ...arena,
            breakConfig: {
              interval: 2 * min,
              mandatoryBreakEvery: 2 * min,
              duration: min,
            },
          },
          entries,
        );
        expect(actual).toEqual(expected);
      });

      describe('長い発表で休憩を確保できない場合は mandatoryBreakEvery の値に基づいて休憩を挿入', () => {
        test('mandatoryBreakEvery null の場合', () => {
          const expected = [
            {
              type: 'presentation',
              entryId: '1',
              endAt: new Date('1970-01-01T00:10:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '2',
              endAt: new Date('1970-01-01T00:20:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '3',
              endAt: new Date('1970-01-01T00:30:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '4',
              endAt: new Date('1970-01-01T00:40:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '5',
              endAt: new Date('1970-01-01T01:40:00Z').valueOf(),
            },
            {
              type: 'break',
              endAt: new Date('1970-01-01T01:50:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '6',
              endAt: new Date('1970-01-01T02:00:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '7',
              endAt: new Date('1970-01-01T02:10:00Z').valueOf(),
            },
          ] as const satisfies ReturnType<typeof calcTimetable>;

          const arena = {
            firstPresentationStartTime: new Date(
              '1970-01-01T00:00:00Z',
            ).valueOf(),
            breakConfig: null,
          } as const satisfies Arena;

          const entries = [
            { id: '1', duration: 10 * min },
            { id: '2', duration: 10 * min },
            { id: '3', duration: 10 * min },
            { id: '4', duration: 10 * min },
            { id: '5', duration: 60 * min },
            { id: '6', duration: 10 * min },
            { id: '7', duration: 10 * min },
          ] as const satisfies Entries;

          const actual = calcTimetable(
            {
              ...arena,
              breakConfig: {
                interval: 45 * min,
                mandatoryBreakEvery: null,
                duration: 10 * min,
              },
            },
            entries,
          );
          expect(actual).toEqual(expected);
        });

        test('mandatoryBreakEvery 1 以上 の場合', () => {
          const expected = [
            {
              type: 'presentation',
              entryId: '1',
              endAt: new Date('1970-01-01T00:10:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '2',
              endAt: new Date('1970-01-01T00:20:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '3',
              endAt: new Date('1970-01-01T00:30:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '4',
              endAt: new Date('1970-01-01T00:40:00Z').valueOf(),
            },
            {
              type: 'break',
              endAt: new Date('1970-01-01T00:50:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '5',
              endAt: new Date('1970-01-01T01:50:00Z').valueOf(),
            },
            {
              type: 'break',
              endAt: new Date('1970-01-01T02:00:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '6',
              endAt: new Date('1970-01-01T02:10:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '7',
              endAt: new Date('1970-01-01T02:20:00Z').valueOf(),
            },
          ] as const satisfies ReturnType<typeof calcTimetable>;

          const arena = {
            firstPresentationStartTime: new Date(
              '1970-01-01T00:00:00Z',
            ).valueOf(),
            breakConfig: null,
          } as const satisfies Arena;

          const entries = [
            { id: '1', duration: 10 * min },
            { id: '2', duration: 10 * min },
            { id: '3', duration: 10 * min },
            { id: '4', duration: 10 * min },
            { id: '5', duration: 60 * min },
            { id: '6', duration: 10 * min },
            { id: '7', duration: 10 * min },
          ] as const satisfies Entries;

          const actual = calcTimetable(
            {
              ...arena,
              breakConfig: {
                interval: 45 * min,
                mandatoryBreakEvery: 60 * min,
                duration: 10 * min,
              },
            },
            entries,
          );
          expect(actual).toEqual(expected);
        });

        test('', () => {
          const expected = [
            {
              type: 'presentation',
              entryId: '1',
              endAt: new Date('1970-01-01T00:50:00Z').valueOf(),
            },
            {
              type: 'break',
              endAt: new Date('1970-01-01T01:00:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '2',
              endAt: new Date('1970-01-01T01:50:00Z').valueOf(),
            },
          ] as const satisfies ReturnType<typeof calcTimetable>;

          const arena = {
            firstPresentationStartTime: new Date(
              '1970-01-01T00:00:00Z',
            ).valueOf(),
            breakConfig: null,
          } as const satisfies Arena;

          const entries = [
            { id: '1', duration: 50 * min },
            { id: '2', duration: 50 * min },
          ] as const satisfies Entries;

          const actual = calcTimetable(
            {
              ...arena,
              breakConfig: {
                interval: 50 * min,
                mandatoryBreakEvery: 50 * min,
                duration: 10 * min,
              },
            },
            entries,
          );
          expect(actual).toEqual(expected);
        });

        test('', () => {
          const expected = [
            {
              type: 'presentation',
              entryId: '1',
              endAt: new Date('1970-01-01T00:50:00Z').valueOf(),
            },
            {
              type: 'break',
              endAt: new Date('1970-01-01T01:00:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '2',
              endAt: new Date('1970-01-01T01:50:00Z').valueOf(),
            },
          ] as const satisfies ReturnType<typeof calcTimetable>;

          const arena = {
            firstPresentationStartTime: new Date(
              '1970-01-01T00:00:00Z',
            ).valueOf(),
            breakConfig: null,
          } as const satisfies Arena;

          const entries = [
            { id: '1', duration: 50 * min },
            { id: '2', duration: 50 * min },
          ] as const satisfies Entries;

          const actual = calcTimetable(
            {
              ...arena,
              breakConfig: {
                interval: 51 * min,
                mandatoryBreakEvery: 50 * min,
                duration: 10 * min,
              },
            },
            entries,
          );
          expect(actual).toEqual(expected);
        });

        test('', () => {
          const expected = [
            {
              type: 'presentation',
              entryId: '1',
              endAt: new Date('1970-01-01T00:50:00Z').valueOf(),
            },
            {
              type: 'presentation',
              entryId: '2',
              endAt: new Date('1970-01-01T01:40:00Z').valueOf(),
            },
          ] as const satisfies ReturnType<typeof calcTimetable>;

          const arena = {
            firstPresentationStartTime: new Date(
              '1970-01-01T00:00:00Z',
            ).valueOf(),
            breakConfig: null,
          } as const satisfies Arena;

          const entries = [
            { id: '1', duration: 50 * min },
            { id: '2', duration: 50 * min },
          ] as const satisfies Entries;

          const actual = calcTimetable(
            {
              ...arena,
              breakConfig: {
                interval: 51 * min,
                mandatoryBreakEvery: 100 * min,
                duration: 10 * min,
              },
            },
            entries,
          );
          expect(actual).toEqual(expected);
        });
      });
    });
  });
});
