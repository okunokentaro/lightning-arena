import express from 'express';

import { handle as handleArenaPost } from '../handlers/arena-post/handle-arena-post';
import { arenaAtom } from '../models/arena';
import { allowCrossOrigin } from './allow-cross-origin';

const port = 3001;

export function prepareServer(): void {
  const app = express();

  app.use(express.json());
  app.use(allowCrossOrigin);

  app.get('/', (req, res) => {
    res.send(JSON.stringify(arenaAtom.get()));
  });

  app.post('/arena', (req, res) => handleArenaPost(req, res));

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
}
