'use client';

import { ReactElement, useCallback } from 'react';
import { useForm } from 'react-hook-form';

type Props = Readonly<{
  ip: string;
}>;

export function CreateArenaForm({ ip }: Props): ReactElement {
  const { register, handleSubmit } = useForm<Readonly<{ title: string }>>();

  type Data = Parameters<Parameters<typeof handleSubmit>[0]>[0];
  const save = useCallback(
    (data: Data) => {
      (async (): Promise<void> => {
        await fetch(`http://${ip}:3001`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data }),
        });
      })().catch((e) => {
        throw e;
      });
    },
    [ip],
  );

  return (
    <div>
      <h1>新規アリーナ作成</h1>
      <form
        onSubmit={(ev): void => {
          handleSubmit(save)(ev).catch((e) => {
            throw e;
          });
        }}
      >
        <input {...register('title')} />
      </form>
    </div>
  );
}
