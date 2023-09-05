import { useLocalStorage } from 'usehooks-ts';

import { codeKey } from './local-storage-key';

export function useSetCode(): ReturnType<typeof useLocalStorage<string>>[1] {
  const [, setCode] = useLocalStorage(codeKey, '');
  return setCode;
}
