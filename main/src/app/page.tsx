import { ReactElement } from 'react';

import { getLocalIp } from '../../../universal/src';
import { Sandbox } from '../client';

export default function AppPage(): ReactElement {
  const ip = getLocalIp();
  return <Sandbox ip={ip} />;
}
