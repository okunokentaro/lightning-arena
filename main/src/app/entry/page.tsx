import { ReactElement } from 'react';
import { getLocalIp } from 'universal/src';

import { EntryPagePresentation } from '../../client';

export default function EntryPage(): ReactElement {
  const ip = getLocalIp();
  return <EntryPagePresentation ip={ip} />;
}
