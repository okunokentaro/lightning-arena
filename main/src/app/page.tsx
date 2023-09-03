import { ReactElement } from 'react';
import { getLocalIp } from 'universal/src';

import { AppPagePresentation } from '../client';

export default function AppPage(): ReactElement {
  const ip = getLocalIp();
  return <AppPagePresentation ip={ip} />;
}
