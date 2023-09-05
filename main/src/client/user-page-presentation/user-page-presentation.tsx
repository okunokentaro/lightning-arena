'use client';

import { ReactElement } from 'react';
import { ipAtom } from '../ip-atom';
import { Form } from './form';

type Props = Readonly<{
  ip: string;
}>;

export function UserPagePresentation({ ip }: Props): ReactElement {
  ipAtom.set(ip);
  return <Form />;
}
