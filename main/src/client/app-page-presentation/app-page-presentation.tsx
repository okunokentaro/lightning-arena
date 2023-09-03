'use client';

import { useRouter } from 'next/navigation';
import { ReactElement, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type Props = Readonly<{
  pin: string;
}>;

export function AppPagePresentation({ pin }: Props): ReactElement {
  const router = useRouter();
  const [, setPin] = useLocalStorage('laPin', '');

  useEffect(() => {
    setPin(pin);
    router.push('/create-arena');
  }, [pin, router, setPin]);

  return <></>;
}
