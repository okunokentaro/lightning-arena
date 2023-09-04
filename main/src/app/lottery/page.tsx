import { ReactElement } from 'react';
import { getLocalIp } from 'universal/src';

import { LotteryPagePresentation } from '../../client';

export default function CreateArenaPage(): ReactElement {
  const ip = getLocalIp();
  return <LotteryPagePresentation ip={ip} />;
}
