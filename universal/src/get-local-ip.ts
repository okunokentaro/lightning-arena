import { networkInterfaces } from 'os';

import { isEnabledLocalhost } from './is-enabled-localhost';

type Interfaces = ReturnType<typeof networkInterfaces>;
type Info = NonNullable<Interfaces[keyof Interfaces]>;

export function getLocalIp(): string {
  if (isEnabledLocalhost) {
    return 'localhost';
  }

  const interfaces = networkInterfaces();

  const found =
    Object.values(interfaces)
      .filter((v): v is Info => typeof v !== 'undefined')
      .flatMap((v) => v)
      .find((v) => v.family === 'IPv4' && !v.internal) ?? null;

  return found?.address ?? '';
}
