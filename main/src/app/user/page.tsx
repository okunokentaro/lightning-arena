import { ReactElement } from 'react';
import { getLocalIp } from 'universal/src';

import { UserPagePresentation } from '../../client';

export default function UserPage(): ReactElement {
  const ip = getLocalIp();
  return <UserPagePresentation ip={ip} />;
}
