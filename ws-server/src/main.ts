import { prepareServer } from './prepare-server';
import { prepareWebSocket } from './prepare-web-socket';

export function main(): void {
  prepareServer();
  prepareWebSocket();
}
