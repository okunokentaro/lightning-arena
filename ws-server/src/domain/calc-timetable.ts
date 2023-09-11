import { assertExists } from 'universal/src';

type Interval =
  | Readonly<{
      type: 'duration';
      value: number; // ms
    }>
  | Readonly<{
      type: 'count';
      value: number; // 回
    }>;

type BreakDefault = Readonly<{
  interval: Interval;
  duration: number; // ms
}>;

type Arena = Readonly<{
  firstPresentationStartTime: number; // UnixTime ms
  breakDefault: BreakDefault | null;
}>;

type Entry = Readonly<{
  id: string;
  duration: number; // ms
}>;

const timetableTypes = ['presentation', 'break'] as const;
type TimetableType = (typeof timetableTypes)[number];

type Timetable = {
  type: TimetableType;
  entryId: string;
  endAt: number; // UnixTime ms
};

export function calcTimetable(
  arena: Arena,
  entries: readonly Entry[],
): readonly Timetable[] {
  return entries.reduce(
    (acc, v, i): ReturnType<typeof calcTimetable> => {
      if (i === 0) {
        return [
          {
            type: 'presentation',
            entryId: v.id,
            endAt: arena.firstPresentationStartTime + v.duration,
          },
        ];
      }

      const last = acc.at(-1) ?? null;
      assertExists(last);
      return [
        ...acc,
        { type: 'presentation', entryId: v.id, endAt: last.endAt + v.duration },
      ];
    },
    [] as ReturnType<typeof calcTimetable>,
  );
}
