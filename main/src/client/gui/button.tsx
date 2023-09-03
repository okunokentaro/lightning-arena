import clsx from 'clsx';
import { ReactElement } from 'react';

type Props = Readonly<{
  label: string;
  disabled: boolean;
}>;

export function Button({ label, disabled }: Props): ReactElement {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={clsx(
        'block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold',
        disabled
          ? 'bg-slate-300 text-slate-400 shadow-none dark:bg-slate-600'
          : clsx(
              'bg-sky-600 text-white shadow-sm hover:bg-sky-700 active:bg-sky-800',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400',
            ),
      )}
    >
      {label}
    </button>
  );
}
