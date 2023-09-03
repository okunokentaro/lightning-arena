'use client';

import { ReactElement } from 'react';

import { ipAtom } from '../ip-atom';
import { Form } from './form';
import { useVerifyPin } from './use-verify-pin';

type Props = Readonly<{
  ip: string;
}>;

export function CreateArenaPagePresentation({ ip }: Props): ReactElement {
  ipAtom.set(ip);
  const { isVerified } = useVerifyPin(ip);

  return isVerified ? <Form /> : <></>;
}
