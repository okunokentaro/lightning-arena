import express from 'express';

import { allowCrossOrigin } from './allow-cross-origin';

export function prepareServer(storeRef: unknown[]): void {
  const app = express();
  const port = 3001;

  app.use(express.json());
  app.use(allowCrossOrigin);

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.post('/', (req, res) => {
    storeRef.push(req.body);
    res.send(storeRef);
  });

  app.listen(port, () => {
    console.info(`Example app listening on port ${port}`);
  });
}
