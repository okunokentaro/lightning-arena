import {
  assertExists,
  exists,
  PreconditionError,
  UnArray,
} from 'universal/src';

type BreakConfig = Readonly<{
  interval: number; // ms

  /**
   * ms
   * 少なくとも mandatoryBreakEvery 以内に休憩
   * 実際は Math.max(interval, mandatoryBreakEvery) が採用される
   */
  mandatoryBreakEvery: number | null;

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

const slotTypes = ['presentation', 'break'] as const;
type SlotType = (typeof slotTypes)[number];

type Slot =
  | Readonly<{
      type: Extract<SlotType, 'presentation'>;
      entryId: string;
      endAt: number; // UnixTime ms
    }>
  | Readonly<{
      type: Extract<SlotType, 'break'>;
      endAt: number; // UnixTime ms
    }>;

function assertBreakConfig(breakConfig: Arena['breakConfig']): void {
  if (exists(breakConfig)) {
    if (breakConfig.interval <= 0) {
      throw new PreconditionError(
        'breakConfig.interval should be a positive integer',
      );
    }
    if (!Number.isSafeInteger(breakConfig.interval)) {
      throw new PreconditionError(
        'breakConfig.interval should be a safe integer',
      );
    }
    if (breakConfig.duration <= 0) {
      throw new PreconditionError(
        'breakConfig.duration should be a positive integer',
      );
    }
    if (!Number.isSafeInteger(breakConfig.duration)) {
      throw new PreconditionError(
        'breakConfig.duration should be a safe integer',
      );
    }
  }
}

function calcMandatoryBreakEvery(
  breakConfig: Arena['breakConfig'],
): number /* ms */ | null {
  if (!exists(breakConfig)) {
    return null;
  }

  return exists(breakConfig.mandatoryBreakEvery)
    ? Math.max(breakConfig.interval, breakConfig.mandatoryBreakEvery)
    : null;
}

function shouldImmediateBreak(
  breakConfig: Arena['breakConfig'],
  sum: number,
): boolean {
  const mandatoryBreakEvery = calcMandatoryBreakEvery(breakConfig);
  return (
    exists(breakConfig) &&
    exists(mandatoryBreakEvery) &&
    mandatoryBreakEvery < sum
  );
}

function needsBreak(
  breakConfig: Arena['breakConfig'],
  sum: number,
  acc: Temp,
): boolean {
  const prevSlot = acc.timetable.at(-1) ?? null;
  assertExists(prevSlot);

  return (
    exists(breakConfig) &&
    breakConfig.interval <= sum &&
    prevSlot.type !== 'break'
  );
}

function shouldInsertBreak(
  arena: Arena,
  entry: Entry,
  i: number,
  arr: readonly Entry[],
): boolean {
  const isLast = i === arr.length - 1;

  return (
    !isLast &&
    exists(arena.breakConfig) &&
    shouldImmediateBreak(
      arena.breakConfig,
      entry.duration + arr[i + 1].duration,
    )
  );
}

type Temp = /* readwrite */ {
  timetable: /* readwrite */ Slot[];
  sum: number;
};

function insertPresentation(arena: Arena, entry: Entry, acc: Temp): void {
  const prevSlot = acc.timetable.at(-1) ?? null;

  if (!exists(prevSlot)) {
    acc.timetable.push({
      type: 'presentation',
      entryId: entry.id,
      endAt: arena.firstPresentationStartTime + entry.duration,
    });
    acc.sum = acc.sum + entry.duration;
    return;
  }

  acc.timetable.push({
    type: 'presentation',
    entryId: entry.id,
    endAt: prevSlot.endAt + entry.duration,
  });
  acc.sum = acc.sum + entry.duration;
}

function insertBreak(arena: Arena, acc: Temp): void {
  assertExists(arena.breakConfig);

  const prevSlot = acc.timetable.at(-1) ?? null;
  assertExists(prevSlot);

  acc.timetable.push({
    type: 'break',
    endAt: prevSlot.endAt + arena.breakConfig.duration,
  });
  acc.sum = 0;
}

export function calcTimetable(
  arena: Arena,
  entries: readonly Entry[],
): readonly Slot[] {
  if (!Number.isSafeInteger(arena.firstPresentationStartTime)) {
    throw new PreconditionError(
      'arena.firstPresentationStartTime should be a safe integer',
    );
  }

  assertBreakConfig(arena.breakConfig);

  return entries.reduce(
    (acc, entry, i, arr): Temp => {
      const isFirst = i === 0;

      if (isFirst) {
        insertPresentation(arena, entry, acc);
        if (shouldInsertBreak(arena, entry, i, arr)) {
          insertBreak(arena, acc);
        }

        return acc;
      }

      if (needsBreak(arena.breakConfig, acc.sum, acc)) {
        insertBreak(arena, acc);
        insertPresentation(arena, entry, acc);
        return acc;
      }

      insertPresentation(arena, entry, acc);
      if (shouldInsertBreak(arena, entry, i, arr)) {
        insertBreak(arena, acc);
      }

      return acc;
    },
    { timetable: [], sum: 0 } as Temp,
  ).timetable;
}
