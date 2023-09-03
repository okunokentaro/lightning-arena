import { WebSocket, WebSocketServer } from 'ws';
import { presentersAtom } from '../../domain/presenter';

const port = 7777;

export function prepareWebSocket(): void {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (ws: WebSocket) => {
    console.info('connected');

    const disposePresenters = presentersAtom.listen((v) => {
      wss.clients.forEach((c) => {
        if (c.readyState === WebSocket.OPEN) {
          c.send(JSON.stringify(v));
          return;
        }
      });
    });

    ws.on('message', (data, isBinary) => {
      wss.clients.forEach((c) => {
        if (c.readyState === WebSocket.OPEN) {
          c.send(data, { binary: isBinary });
          return;
        }
      });
    });

    ws.on('close', () => {
      disposePresenters();
      console.info('closed');
    });
  });

  console.info(`Web socket server has started on port ${port}`);
}
