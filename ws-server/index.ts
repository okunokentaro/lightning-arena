import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 7777 });

wss.on('connection', (ws: WebSocket) => {
  console.info('connected');

  ws.on('message', (data, isBinary) => {
    console.log('data', data);
    wss.clients.forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(data, { binary: isBinary });
        return;
      }
    });
  });

  ws.on('close', () => console.info('closed'));
});
