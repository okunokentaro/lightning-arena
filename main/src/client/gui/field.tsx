import clsx from 'clsx';
import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
} from 'react';

type Props = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'className'
> &
  Readonly<{
    id: string;
    label: string;
  }>;
export const Field = forwardRef(function Field(
  { id, label, ...rest }: Props,
  ref: ForwardedRef<HTMLInputElement>,
): ReactElement {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6">
        {label}
      </label>
      <input
        ref={ref}
        {...rest}
        id={id}
        className={clsx(
          'block w-full rounded-md border-0 px-3 leading-10 shadow-sm',
          'bg-slate-100 dark:bg-slate-900 dark:placeholder:text-slate-400',
          'ring-1 ring-inset ring-slate-500 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-400',
        )}
      />
    </div>
  );
});
