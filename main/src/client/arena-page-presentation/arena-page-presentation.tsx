'use client';

import clsx from 'clsx';
import { QRCodeSVG } from 'qrcode.react';
import { ReactElement } from 'react';

import { Arena } from '../../server/fetch-arena';
import { ipAtom } from '../ip-atom';

type Props = Readonly<{
  ip: string;
  arena: Arena | null;
}>;

export function ArenaPagePresentation({ ip, arena }: Props): ReactElement {
  ipAtom.set(ip);
  const codeText = `http://${ip}:3000/entry`;

  if (!arena) {
    return <h1>まだアリーナが開設されていません。</h1>;
  }

  return (
    <div className="h-screen w-full p-20">
      <h1 className="text-6xl font-bold">{arena.title}</h1>
      <div className="flex h-full items-center justify-center">
        <div
          className={clsx(
            'mx-auto max-w-3xl rounded-xl p-10',
            'border border-slate-300 dark:border-slate-900',
            'bg-slate-200 dark:bg-slate-700',
          )}
        >
          <div className="p-4">
            <div className="rounded-md border-8 border-white bg-white p-6">
              <QRCodeSVG includeMargin={false} size={500} value={codeText} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
