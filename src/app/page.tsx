import { Sandbox } from '../client';
import { getLocalIp } from '../server';

export default function AppPage() {
  return <Sandbox ip={getLocalIp()} />;
}
