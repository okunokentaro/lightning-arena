import express from 'express';
import { WebSocket, WebSocketServer } from 'ws';

import { allowCrossOrigin } from './allow-cross-origin';

const app = express();
const port = 3001;

const store: unknown[] = [];

app.use(express.json());
app.use(allowCrossOrigin);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  store.push(req.body);
  res.send(store);
});

app.listen(port, () => {
  console.info(`Example app listening on port ${port}`);
});

const wss = new WebSocketServer({ port: 7777 });

wss.on('connection', (ws: WebSocket) => {
  console.info('connected');

  ws.on('message', (data, isBinary) => {
    store.push(data);
    wss.clients.forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(data, { binary: isBinary });
        return;
      }
    });
  });

  ws.on('close', () => console.info('closed'));
});
