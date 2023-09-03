import { networkInterfaces } from 'os';
import { Sandbox } from '@/client/sandbox';

type NetworkInterfacesReturn = ReturnType<typeof networkInterfaces>;
type Info = NonNullable<NetworkInterfacesReturn[keyof NetworkInterfacesReturn]>;

function getLocalIp(): string {
  const interfaces = networkInterfaces();
  const found =
    Object.values(interfaces)
      .filter((v): v is Info => typeof v !== 'undefined')
      .flatMap((v) => v)
      .find((v) => v.family === 'IPv4' && !v.internal) ?? null;

  return found?.address ?? '';
}

export default function Home() {
  return <Sandbox ip={getLocalIp()} />;
}
