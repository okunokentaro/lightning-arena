import { prepareServer, prepareWebSocket } from './shared';

export function main(): void {
  prepareServer();
  prepareWebSocket();
}
