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
          ? clsx(
              'shadow-none',
              'text-slate-400 dark:text-slate-500',
              'bg-slate-300 dark:bg-slate-700',
            )
          : clsx(
              'text-white shadow-sm',
              'bg-sky-500 hover:bg-sky-600 active:bg-sky-700',
              'dark:bg-sky-600 dark:hover:bg-sky-700 dark:active:bg-sky-800',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:focus-visible:outline-sky-400',
            ),
      )}
    >
      {label}
    </button>
  );
}
