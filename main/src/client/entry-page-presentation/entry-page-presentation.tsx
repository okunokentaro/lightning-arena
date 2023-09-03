'use client';

import { ReactElement } from 'react';
import { EntryForm } from './entry-form';

type Props = Readonly<{
  ip: string;
}>;

export function EntryPagePresentation({ ip }: Props): ReactElement {
  return <EntryForm ip={ip} />;
}
