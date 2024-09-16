'use client';

import { useStore } from '@nanostores/react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ReactElement, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Field } from '../gui';
import { ipAtom } from '../ip-atom';
import { FormType } from './form-type';
import { useSyncFields } from './use-sync-fields';

export function Form(): ReactElement {
  const ip = useStore(ipAtom);
  const router = useRouter();

  const { register, handleSubmit, watch, setValue } = useForm<FormType>({
    defaultValues: { xAccountId: '', displayName: '' },
  });

  const xAccountId = watch('xAccountId'); // no useMemo
  const displayName = watch('displayName'); // no useMemo

  const { desync } = useSyncFields({ setValue, xAccountId, displayName });

  const disabled = useMemo(
    () => xAccountId === '' && displayName === '',
    [xAccountId, displayName],
  );

  type Data = Parameters<Parameters<typeof handleSubmit>[0]>[0];
  const save = useCallback(
    (data: Data) => {
      (async (): Promise<void> => {
        await fetch(`http://${ip}:3001/presenters`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        router.push('/arena');
      })().catch((e) => {
        throw e;
      });
    },
    [ip, router],
  );

  return (
    <div className="flex h-full justify-center md:items-center">
      <div
        className={clsx(
          'flex rounded-xl p-6 pt-10 md:p-10',
          'border-0 border-slate-300 dark:border-zinc-950 md:border',
          'bg-slate-200 dark:bg-slate-800',
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
            <div className="flex flex-col gap-1">
              <p>Xアカウント名を入力してください。</p>
              <p>
                お持ちでない場合、非公開にしたい場合は名前を入力してください。
              </p>
            </div>
          </div>

          <div className={clsx('flex flex-col gap-4')}>
            <Field
              {...register('xAccountId')}
              id={'xAccountId'}
              label={'Xアカウント名'}
              placeholder={'lightning'}
            />

            <Field
              {...register('displayName')}
              id={'displayName'}
              label={'名前'}
              placeholder={'ライトニング'}
              onFocus={desync}
            />
          </div>

          <Button label={'エントリー'} disabled={disabled} />
        </form>
      </div>
    </div>
  );
}
