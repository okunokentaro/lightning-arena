import express from 'express';

import { $exampleStore } from '../../example-store';
import { allowCrossOrigin } from './allow-cross-origin';

const port = 3001;

export function prepareServer(): void {
  const app = express();

  app.use(express.json());
  app.use(allowCrossOrigin);

  app.get('/', (req, res) => {
    res.send(JSON.stringify($exampleStore.get()));
  });

  app.post('/', (req, res) => {
    res.send({});
  });

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
}
