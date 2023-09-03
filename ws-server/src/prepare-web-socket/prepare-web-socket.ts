import { WebSocket, WebSocketServer } from 'ws';

const port = 7777;

export function prepareWebSocket(): void {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (ws: WebSocket) => {
    console.info('connected');

    ws.on('message', (data, isBinary) => {
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
