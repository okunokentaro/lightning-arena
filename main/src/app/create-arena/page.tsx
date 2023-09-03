import { ReactElement } from 'react';
import { getLocalIp } from 'universal/src';

import { CreateArenaPagePresentation } from '../../client';

export default function CreateArenaPage(): ReactElement {
  const ip = getLocalIp();
  return <CreateArenaPagePresentation ip={ip} />;
}
