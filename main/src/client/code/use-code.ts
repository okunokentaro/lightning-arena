import { useLocalStorage } from 'usehooks-ts';

import { codeKey } from './local-storage-key';

export function useCode(): ReturnType<typeof useLocalStorage<string>>[0] {
  const [code] = useLocalStorage(codeKey, '');
  return code;
}
