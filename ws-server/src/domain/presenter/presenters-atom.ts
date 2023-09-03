import { atom } from 'nanostores';

type Presenter = Readonly<{
  id: string;
  xAccountId: string;
  displayName: string;
}>;

export const presentersAtom = atom<readonly Presenter[]>([]);
