'use client';

import { useRouter } from 'next/navigation';
import { ReactElement, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type Props = Readonly<{
  code: string;
}>;

export function AppPagePresentation({ code }: Props): ReactElement {
  const router = useRouter();
  const [, setCode] = useLocalStorage('laCode', '');

  useEffect(() => {
    setCode(code);
    router.push('/create-arena');
  }, [code, router, setCode]);

  return <></>;
}
