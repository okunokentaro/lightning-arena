'use client';

import { ReactElement } from 'react';
import { ipAtom } from '../ip-atom';
import { EntryForm } from './entry-form';

type Props = Readonly<{
  ip: string;
}>;

export function EntryPagePresentation({ ip }: Props): ReactElement {
  ipAtom.set(ip);
  return <EntryForm />;
}
