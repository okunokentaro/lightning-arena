'use client';

import { ReactElement } from 'react';

import { Sandbox } from './sandbox';

type Props = Readonly<{
  ip: string;
}>;

export function ArenaPagePresentation({ ip }: Props): ReactElement {
  return <Sandbox ip={ip} />;
}
