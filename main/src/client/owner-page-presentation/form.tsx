'use client';

import { useStore } from '@nanostores/react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ReactElement, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Field } from '../gui';
import { ipAtom } from '../ip-atom';
import { FormType } from './form-type';

export function Form(): ReactElement {
  const ip = useStore(ipAtom);
  const router = useRouter();

  const { register, handleSubmit, watch } = useForm<FormType>({
    defaultValues: { title: '', hashTags: '' },
  });

  const title = watch('title'); // no useMemo

  const disabled = useMemo(() => [title].some((v) => v === ''), [title]);

  type Data = Parameters<Parameters<typeof handleSubmit>[0]>[0];
  const save = useCallback(
    (data: Data) => {
      (async (): Promise<void> => {
        await fetch(`http://${ip}:3001/arena`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        router.push(`/arena?${Date.now()}`);
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
        className={clsx('flex flex-col gap-6')}
        onSubmit={(ev): void => {
          handleSubmit(save)(ev).catch((e) => {
            throw e;
          });
        }}
      >
        <Field
          {...register('title', { required: true })}
          id={'title'}
          label={'タイトル'}
          placeholder="夏のLT発表会"
        />

        <Field
          {...register('hashTags')}
          id={'hashTags'}
          label={'ハッシュタグ（複数ある場合はスペースで区切る）'}
          placeholder="summar_lt dev_event"
        />

        <Button label={'アリーナを開設'} disabled={disabled} />
      </form>
    </div>
  );
}
