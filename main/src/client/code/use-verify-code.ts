import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type Return = Readonly<{
  isVerified: boolean;
}>;

export function useVerifyCode(ip: string): Return {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [code] = useLocalStorage('laCode', '');
  const router = useRouter();

  useEffect(() => {
    (async (): Promise<void> => {
      const res = await fetch(`http://${ip}:3001/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        router.push('/arena');
        return;
      }

      setIsVerified(true);
    })().catch((e) => {
      throw e;
    });
  }, [ip, code, router]);

  return useMemo(() => ({ isVerified }), [isVerified]);
}
