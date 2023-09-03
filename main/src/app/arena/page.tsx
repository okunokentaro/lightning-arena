import { ReactElement } from 'react';
import { getLocalIp } from 'universal/src';

import { Sandbox } from '../../client';

export default function ArenaPage(): ReactElement {
  const ip = getLocalIp();
  return <Sandbox ip={ip} />;
}
