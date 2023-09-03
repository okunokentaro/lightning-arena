import { prepareServer } from './prepare-server';
import { prepareWebSocket } from './prepare-web-socket';

export function main(storeRef: unknown[]): void {
  prepareServer(storeRef);
  prepareWebSocket(storeRef);
}
