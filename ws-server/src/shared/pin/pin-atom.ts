import { atom } from 'nanostores';

import { makePin } from './make-pin';

export const pinAtom = atom<string>(makePin());
