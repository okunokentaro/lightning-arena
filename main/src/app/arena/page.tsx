import { ReactElement } from 'react';
import { getLocalIp } from 'universal/src';

import { ArenaPagePresentation } from '../../client';

export default function ArenaPage(): ReactElement {
  const ip = getLocalIp();
  return <ArenaPagePresentation ip={ip} />;
}
