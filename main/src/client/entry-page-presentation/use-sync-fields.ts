import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Form } from './form';

type Params = Readonly<{
  setValue: ReturnType<typeof useForm<Form>>['setValue'];
  xAccountId: Form['xAccountId'];
  displayName: Form['displayName'];
}>;

export function useSyncFields({
  setValue,
  xAccountId,
  displayName,
}: Params): void {
  const [isSync, setIsSync] = useState(false);

  useEffect(() => {
    if (!isSync && xAccountId.length === 0 && 1 <= displayName.length) {
      return;
    }
    if (
      xAccountId.slice(0, -1) === displayName ||
      xAccountId === displayName.slice(0, -1)
    ) {
      setIsSync(1 <= xAccountId.length);
      setValue('displayName', xAccountId);
      return;
    }
    // noop
  }, [xAccountId, displayName, setValue, isSync]);
}
