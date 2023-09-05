'use client';

import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { exists } from 'universal/src';

import { useVerifyCode } from '../code';
import { ipAtom } from '../ip-atom';
import { Form } from './form';

type Props = Readonly<{
  ip: string;
}>;

export function OwnerPagePresentation({ ip }: Props): ReactElement {
  ipAtom.set(ip);
  const router = useRouter();
  const { isVerified, error } = useVerifyCode(ip);

  if (exists(error)) {
    router.push('/user');
    return <></>;
  }

  return isVerified ? <Form /> : <></>;
}
