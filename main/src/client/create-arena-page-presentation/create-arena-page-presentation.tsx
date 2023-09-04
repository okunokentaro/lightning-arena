'use client';

import { ReactElement } from 'react';

import { ipAtom } from '../ip-atom';
import { useVerifyPin } from '../pin';
import { Form } from './form';

type Props = Readonly<{
  ip: string;
}>;

export function CreateArenaPagePresentation({ ip }: Props): ReactElement {
  ipAtom.set(ip);
  const { isVerified } = useVerifyPin(ip);

  return isVerified ? <Form /> : <></>;
}
