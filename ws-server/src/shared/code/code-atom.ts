import { atom } from 'nanostores';

import { makeCode } from './make-code';

export const codeAtom = atom<string>(makeCode());
