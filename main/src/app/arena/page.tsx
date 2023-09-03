import { ReactElement } from 'react';
import { getLocalIp } from 'universal/src';

import { ArenaPagePresentation } from '../../client';

export default async function ArenaPage(): Promise<ReactElement> {
  const ip = getLocalIp();

  const res = await fetch(`http://${ip}:3001`, { method: 'GET' });
  const json = await res.json();
  console.log(json);

  return <ArenaPagePresentation ip={ip} json={json} />;
}
