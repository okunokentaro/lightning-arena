import { Readonly } from 'json-schema-to-ts/lib/types/type-utils';

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
  break: BreakDefault | null;
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
      return [
        ...acc,
        { type: 'presentation', entryId: v.id, endAt: v.duration },
      ];
    },
    [] as ReturnType<typeof calcTimetable>,
  );
}
