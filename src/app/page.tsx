import { ReactElement } from 'react';

import { Sandbox } from '../client';
import { getLocalIp } from '../server';

export default function AppPage(): ReactElement {
  const ip = getLocalIp();
  return <Sandbox ip={ip} />;
}
