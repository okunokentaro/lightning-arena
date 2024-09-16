'use client';

import clsx from 'clsx';
import { QRCodeSVG } from 'qrcode.react';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { exists } from 'universal/src';

import { Arena } from '../../server/fetch-arena';
import { Field } from '../gui';
import { ipAtom } from '../ip-atom';

type Props = Readonly<{
  ip: string;
  arena: Arena | null;
}>;

export function ArenaPagePresentation({ ip, arena }: Props): ReactElement {
  ipAtom.set(ip);

  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleChild, setIsVisibleChild] = useState(false);

  const wsRef = useRef<WebSocket>(new WebSocket(`ws://${ip}:7777`));
  const codeText = `http://${ip}:3000/entry`;

  useEffect(() => {
    const socket = wsRef.current;
    socket.addEventListener('message', (ev) => {
      if (typeof ev.data === 'string') {
        setMessage(ev.data);
        return;
      }
    });
    return () => socket.close();
  }, []);

  const handleClick = useCallback(() => {
    if (!isVisible) {
      setIsVisible(true);
      setTimeout(() => setIsVisibleChild(true), 100);
      return;
    }
    if (isVisibleChild) {
      setIsVisibleChild(false);
      setTimeout(() => setIsVisible(false), 100);
      return;
    }
  }, [isVisible, isVisibleChild]);

  console.info(message); // @TODO

  if (!exists(arena)) {
    return <h1>まだアリーナが開設されていません。</h1>;
  }

  return (
    <div className="">
      <div className={clsx('flex')}>
        <div
          className={clsx('h-screen grow p-16 transition-width duration-300')}
        >
          <div className={clsx('flex h-full items-center justify-center')}>
            <div
              className={clsx(
                'mx-auto max-w-3xl rounded-xl p-10',
                'border border-slate-300 dark:border-zinc-950',
                'bg-slate-200 dark:bg-slate-800',
              )}
            >
              <div className="p-4">
                <div className="rounded-md border-8 border-white bg-white p-6">
                  <QRCodeSVG
                    includeMargin={false}
                    size={500}
                    value={codeText}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            'flex h-screen w-full items-center justify-center transition-width duration-300 dark:bg-zinc-900',
            isVisible ? 'w-7/12 max-w-3xl' : 'w-0 max-w-0',
          )}
        >
          {isVisible && (
            <div
              className={clsx(
                'flex h-screen w-full items-center justify-center p-8 transition-opacity duration-300',
                isVisibleChild ? 'opacity-100' : 'opacity-0',
              )}
            >
              <div className="flex h-3/6 w-full flex-col gap-4">
                <Field id="title" label={'タイトル'} />
                <Field id="hashTags" label={'ハッシュタグ'} />
                <Field id="fee" label={'参加費'} />
                <Field id="startTime" label={'開始時間'} />
                <Field id="allottedTime" label={'一人あたりの発表時間'} />
                <Field id="introTime" label={'自己紹介の時間'} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-0 w-full p-16">
        <div className="flex flex-row place-content-between">
          <h1 className="text-6xl font-bold">{arena.title}</h1>
          <div className="flex flex-row gap-4">
            {isVisible && (
              <button
                type="button"
                className={clsx(
                  'h-12 min-w-[7em] rounded-md text-center text-sm',
                  'text-white shadow-sm hover:bg-sky-800 active:bg-sky-900 dark:hover:border-slate-400',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400',
                )}
                onClick={handleClick}
              >
                キャンセル
              </button>
            )}

            <button
              type="button"
              className={clsx(
                'h-12 min-w-[7em] rounded-md text-center text-sm',
                'border border-slate-500 text-white shadow-sm hover:bg-sky-800 active:bg-sky-900 dark:hover:border-slate-400',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400',
              )}
              onClick={handleClick}
            >
              {isVisible ? '完了' : '編集'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
