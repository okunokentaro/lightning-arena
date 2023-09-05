import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { exists } from 'universal/src';

import { useCode } from './use-code';

type Return =
  | Readonly<{
      isVerified: boolean;
      error: null;
    }>
  | Readonly<{
      isVerified: false;
      error: Error;
    }>;

export class InvalidCodeError extends Error {}

export function useVerifyCode(ip: string): Return {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const code = useCode();
  const router = useRouter();

  useEffect(() => {
    (async (): Promise<void> => {
      const res = await fetch(`http://${ip}:3001/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        setError(new InvalidCodeError('forbidden access'));
        return;
      }

      setIsVerified(true);
    })().catch((e) => {
      throw e;
    });
  }, [ip, code, router]);

  return useMemo(() => {
    return exists(error)
      ? { isVerified: false, error }
      : { isVerified, error: null };
  }, [isVerified, error]);
}
