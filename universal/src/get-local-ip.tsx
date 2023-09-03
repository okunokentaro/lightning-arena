import { networkInterfaces } from 'os';

type Interfaces = ReturnType<typeof networkInterfaces>;
type Info = NonNullable<Interfaces[keyof Interfaces]>;

const env = true; // @TODO 設定変更可能にする

export function getLocalIp(): string {
  if (env) {
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
