import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Form } from './form';

type Params = Readonly<{
  setValue: ReturnType<typeof useForm<Form>>['setValue'];
  xAccountId: Form['xAccountId'];
  displayName: Form['displayName'];
}>;

type Return = Readonly<{
  desync: () => void;
}>;

export function useSyncFields({
  setValue,
  xAccountId,
  displayName,
}: Params): Return {
  const [isSync, setIsSync] = useState<boolean>(false);
  const desync = useCallback(() => setIsSync(false), []);

  useEffect(() => {
    if (
      (xAccountId.slice(0, -1) === displayName && displayName === '') ||
      (isSync && xAccountId.slice(0, -1) === displayName) ||
      (isSync && xAccountId === displayName.slice(0, -1))
    ) {
      setValue('displayName', xAccountId);
      setIsSync(true);
      return;
    }
  }, [setValue, xAccountId, displayName, isSync]);

  return useMemo(() => ({ desync }), [desync]);
}
