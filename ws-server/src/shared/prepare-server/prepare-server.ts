import express from 'express';

import { arenaAtom } from '../../domain/arena';
import { handle as handleArenaPost } from '../../handlers/arena-post/handle-arena-post';
import { handleError } from '../error';
import { allowCrossOrigin } from './allow-cross-origin';

const port = 3001;

export function prepareServer(): void {
  const app = express();

  app.use(handleError((req, res, next) => express.json()(req, res, next)));
  app.use(handleError((req, res, next) => allowCrossOrigin(req, res, next)));

  app.get('/', (req, res) => {
    res.send(JSON.stringify(arenaAtom.get()));
  });

  app.post(
    '/arena',
    handleError((req, res) => handleArenaPost(req, res)),
  );

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
}
