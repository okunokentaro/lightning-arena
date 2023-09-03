'use client';

import clsx from 'clsx';
import { QRCodeSVG } from 'qrcode.react';
import { ReactElement } from 'react';

type Props = Readonly<{
  ip: string;
  json: unknown;
}>;

export function ArenaPagePresentation({ ip }: Props): ReactElement {
  const codeText = `http://${ip}:3000/entry`;

  return (
    <div className="h-screen w-full p-20">
      <h1 className="text-6xl font-bold">イベントのタイトル</h1>
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
