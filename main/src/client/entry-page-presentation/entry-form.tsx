'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ReactElement, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Form } from './form';
import { useSyncFields } from './use-sync-fields';

type Props = Readonly<{
  ip: string;
}>;

export function EntryForm({ ip }: Props): ReactElement {
  const router = useRouter();
  const { register, handleSubmit, watch, setValue } = useForm<Form>({
    defaultValues: { xAccountId: '', displayName: '' },
  });

  const xAccountId = watch('xAccountId'); // no useMemo
  const displayName = watch('displayName'); // no useMemo

  useSyncFields({ setValue, xAccountId, displayName });

  const disabled = useMemo(() => {
    return xAccountId === '' && displayName === '';
  }, [xAccountId, displayName]);

  type Data = Parameters<Parameters<typeof handleSubmit>[0]>[0];
  const save = useCallback(
    (data: Data) => {
      (async (): Promise<void> => {
        await fetch(`http://${ip}:3001`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data }),
        });
        router.push('/arena');
      })().catch((e) => {
        throw e;
      });
    },
    [ip, router],
  );

  return (
    <div
      className={clsx(
        'mx-auto flex max-w-3xl rounded-xl p-10',
        'border border-slate-300 dark:border-slate-900',
        'bg-slate-200 dark:bg-slate-700',
      )}
    >
      <form
        className={clsx('flex flex-col gap-12')}
        onSubmit={(ev): void => {
          handleSubmit(save)(ev).catch((e) => {
            throw e;
          });
        }}
      >
        <div className={clsx('flex flex-col gap-4')}>
          <h1 className="text-2xl font-semibold">エントリーする</h1>
          <p>
            Xアカウント名を入力してください。お持ちでない場合、非公開にしたい場合は名前を入力してください。
          </p>
        </div>

        <div className={clsx('flex flex-col gap-4')}>
          <div>
            <label
              htmlFor="EntryFormXAccount"
              className="block text-sm font-medium leading-6"
            >
              Xアカウント名
            </label>
            <input
              id="EntryFormXAccount"
              {...register('xAccountId')}
              placeholder="lightning83"
              className={clsx(
                'block w-full rounded-md border-0 px-3 leading-10 shadow-sm',
                'bg-slate-100 dark:bg-slate-900 dark:placeholder:text-slate-400',
                'ring-1 ring-inset ring-slate-500 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-400',
              )}
            />
          </div>
          <div>
            <label
              htmlFor="EntryFormName"
              className="block text-sm font-medium leading-6"
            >
              名前
            </label>
            <input
              id="EntryFormName"
              {...register('displayName')}
              placeholder="ライトニング"
              className={clsx(
                'block w-full rounded-md border-0 px-3 leading-10 shadow-sm',
                'bg-slate-100 dark:bg-slate-900 dark:placeholder:text-slate-400',
                'ring-1 ring-inset ring-slate-500 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-400',
              )}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={disabled}
          className={clsx(
            'block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold',
            disabled
              ? 'bg-slate-300 text-slate-400 shadow-none dark:bg-slate-600'
              : 'bg-sky-600 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:bg-sky-800',
          )}
        >
          エントリー
        </button>
      </form>
    </div>
  );
}
