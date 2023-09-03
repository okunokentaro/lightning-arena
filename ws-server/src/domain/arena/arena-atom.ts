import { atom } from 'nanostores';

type Arena = Readonly<{
  title: string;
  hashTags: string[];
}>;

export const arenaAtom = atom<Arena | null>(null);
