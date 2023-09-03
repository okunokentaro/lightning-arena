'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ReactElement, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

type Props = Readonly<{
  ip: string;
}>;

export function CreateArenaForm({ ip }: Props): ReactElement {
  const router = useRouter();
  const { register, handleSubmit, watch } =
    useForm<Readonly<{ title: string; hashTags: string }>>();

  const title = watch('title'); // no useMemo

  const disabled = useMemo(() => [title].some((v) => v === ''), [title]);

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
        'mx-auto flex max-w-3xl flex-col gap-10 rounded-xl p-10',
        'border border-slate-300 dark:border-slate-900',
        'bg-slate-200 dark:bg-slate-700',
      )}
    >
      <h1 className="text-2xl font-semibold">新規アリーナ</h1>
      <form
        className={clsx('flex flex-col gap-8')}
        onSubmit={(ev): void => {
          handleSubmit(save)(ev).catch((e) => {
            throw e;
          });
        }}
      >
        <div>
          <label
            htmlFor="CreateArenaFormTitle"
            className="block text-sm font-medium leading-6"
          >
            タイトル
          </label>
          <input
            id="CreateArenaFormTitle"
            {...register('title')}
            required
            placeholder="夏のLT発表会"
            className={clsx(
              'block w-full rounded-md border-0 px-3 leading-10 shadow-sm',
              'bg-slate-100 dark:bg-slate-900 dark:placeholder:text-slate-400',
              'ring-1 ring-inset ring-slate-500 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-400',
            )}
          />
        </div>

        <div>
          <label
            htmlFor="CreateArenaFormHashTags"
            className="block text-sm font-medium leading-6"
          >
            ハッシュタグ（複数ある場合はスペースで区切る）
          </label>
          <input
            id="CreateArenaFormHashTags"
            {...register('hashTags')}
            required
            placeholder="summar_lt dev_event"
            className={clsx(
              'block w-full rounded-md border-0 px-3 leading-10 shadow-sm',
              'bg-slate-100 dark:bg-slate-900 dark:placeholder:text-slate-400',
              'ring-1 ring-inset ring-slate-500 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-sky-400',
            )}
          />
        </div>

        <button
          type="submit"
          disabled={disabled}
          className={clsx(
            'block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold',
            disabled
              ? 'bg-slate-600 text-slate-300 shadow-none'
              : 'bg-sky-600 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:bg-sky-800',
          )}
        >
          アリーナを開設
        </button>
      </form>
    </div>
  );
}
