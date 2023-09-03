import { ReactElement } from 'react';
import { getLocalIp } from 'universal/src';

import { ArenaPagePresentation } from '../../client';
import { fetchArena } from '../../server/fetch-arena';

export default async function ArenaPage(): Promise<ReactElement> {
  const ip = getLocalIp();
  const arena = await fetchArena(ip);

  return <ArenaPagePresentation ip={ip} arena={arena} />;
}
