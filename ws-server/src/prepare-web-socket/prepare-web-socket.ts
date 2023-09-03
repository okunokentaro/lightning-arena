import { WebSocket, WebSocketServer } from 'ws';

import { $exampleStore } from '../../example-store';
import { convertToString } from './convert-to-string';

const port = 7777;

export function prepareWebSocket(): void {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (ws: WebSocket) => {
    console.info('connected');

    ws.on('message', (data, isBinary) => {
      $exampleStore.set([convertToString(data)]);
      wss.clients.forEach((c) => {
        if (c.readyState === WebSocket.OPEN) {
          c.send(data, { binary: isBinary });
          return;
        }
      });
    });

    ws.on('close', () => console.info('closed'));
  });

  console.info(`Web socket server has started on port ${port}`);
}
