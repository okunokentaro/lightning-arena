import { ReactElement } from 'react';
import { getLocalIp } from 'universal/src';

import { CreateArenaForm } from '../client';

export default function AppPage(): ReactElement {
  const ip = getLocalIp();
  return <CreateArenaForm ip={ip} />;
}
