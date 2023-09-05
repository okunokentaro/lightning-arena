import { ReactElement } from 'react';
import { getLocalIp } from 'universal/src';

import { OwnerPagePresentation } from '../../client';

export default function OwnerPage(): ReactElement {
  const ip = getLocalIp();
  return <OwnerPagePresentation ip={ip} />;
}
