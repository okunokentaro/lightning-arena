'use client';

import { useRouter } from 'next/navigation';
import { ReactElement, useEffect } from 'react';
import { useSetCode } from '../code';

type Props = Readonly<{
  code: string;
}>;

export function AppPagePresentation({ code }: Props): ReactElement {
  const router = useRouter();
  const setCode = useSetCode();

  useEffect(() => {
    setCode(code);
    router.push('/owner');
  }, [code, router, setCode]);

  return <></>;
}
