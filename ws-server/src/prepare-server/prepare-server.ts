import express from 'express';

import { allowCrossOrigin } from './allow-cross-origin';

const port = 3001;

export function prepareServer(storeRef: unknown[]): void {
  const app = express();

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
    console.info(`App listening on port ${port}`);
  });
}
