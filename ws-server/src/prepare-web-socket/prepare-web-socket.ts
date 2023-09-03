import { WebSocket, WebSocketServer } from 'ws';

export function prepareWebSocket(storeRef: unknown[]): void {
  const wss = new WebSocketServer({ port: 7777 });

  wss.on('connection', (ws: WebSocket) => {
    console.info('connected');

    ws.on('message', (data, isBinary) => {
      storeRef.push(data);
      wss.clients.forEach((c) => {
        if (c.readyState === WebSocket.OPEN) {
          c.send(data, { binary: isBinary });
          return;
        }
      });
    });

    ws.on('close', () => console.info('closed'));
  });
}
