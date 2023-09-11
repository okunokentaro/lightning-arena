import { assertExists, exists } from 'universal/src';

type BreakConfig = Readonly<{
  interval: number; // ms
  mandatoryBreakEvery: number | null; // ms 少なくとも mandatoryBreakEvery 以内に休憩
  duration: number; // ms
}>;

type Arena = Readonly<{
  firstPresentationStartTime: number; // UnixTime ms
  breakConfig: BreakConfig | null;
}>;

type Entry = Readonly<{
  id: string;
  duration: number; // ms
}>;

const timetableTypes = ['presentation', 'break'] as const;
type TimetableType = (typeof timetableTypes)[number];

type Timetable =
  | Readonly<{
      type: Extract<TimetableType, 'presentation'>;
      entryId: string;
      endAt: number; // UnixTime ms
    }>
  | Readonly<{
      type: Extract<TimetableType, 'break'>;
      endAt: number; // UnixTime ms
    }>;

export function calcTimetable(
  arena: Arena,
  entries: readonly Entry[],
): readonly Timetable[] {
  type Temp = Readonly<{
    timetable: ReturnType<typeof calcTimetable>;
    sum: number;
  }>;

  return entries.reduce(
    (acc, v, i, arr): Temp => {
      if (i === 0) {
        return {
          timetable: [
            {
              type: 'presentation',
              entryId: v.id,
              endAt: arena.firstPresentationStartTime + v.duration,
            },
          ],
          sum: v.duration,
        };
      }

      const last = acc.timetable.at(-1) ?? null;
      assertExists(last);

      if (exists(arena.breakConfig) && arena.breakConfig.interval <= acc.sum) {
        return {
          timetable: [
            ...acc.timetable,
            {
              type: 'break',
              endAt: last.endAt + arena.breakConfig.duration,
            },
            {
              type: 'presentation',
              entryId: v.id,
              endAt: last.endAt + arena.breakConfig.duration + v.duration,
            },
          ],
          sum: v.duration,
        };
      }

      const mandatoryBreakEvery =
        arena.breakConfig?.mandatoryBreakEvery ?? Number.MAX_SAFE_INTEGER;

      if (
        i < arr.length - 1 &&
        exists(arena.breakConfig) &&
        mandatoryBreakEvery < acc.sum + arr[i + 1].duration
      ) {
        return {
          timetable: [
            ...acc.timetable,
            {
              type: 'presentation',
              entryId: v.id,
              endAt: last.endAt + v.duration,
            },
            {
              type: 'break',
              endAt: last.endAt + v.duration + arena.breakConfig.duration,
            },
          ],
          sum: v.duration,
        };
      }

      return {
        timetable: [
          ...acc.timetable,
          {
            type: 'presentation',
            entryId: v.id,
            endAt: last.endAt + v.duration,
          },
        ],
        sum: acc.sum + v.duration,
      };
    },
    { timetable: [], sum: 0 } as Temp,
  ).timetable;
}
