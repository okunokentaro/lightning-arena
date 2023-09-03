'use client';

import { ReactElement } from 'react';

import { CreateArenaForm } from './create-arena-form';

type Props = Readonly<{
  ip: string;
}>;

export function AppPagePresentation({ ip }: Props): ReactElement {
  return <CreateArenaForm ip={ip} />;
}
