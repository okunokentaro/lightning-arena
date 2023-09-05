'use client';

import { ReactElement } from 'react';
import { useVerifyCode } from '../code';
import { ipAtom } from '../ip-atom';
import { Form } from './form';

type Props = Readonly<{
  ip: string;
}>;

export function OwnerPagePresentation({ ip }: Props): ReactElement {
  ipAtom.set(ip);
  const { isVerified } = useVerifyCode(ip);

  return isVerified ? <Form /> : <></>;
}
