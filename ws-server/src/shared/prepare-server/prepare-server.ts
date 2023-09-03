import express from 'express';
import { getLocalIp } from 'universal/src';

import { arenaAtom } from '../../domain/arena';
import { handle as handleArenaPost } from '../../handlers/arena-post/handle-arena-post';
import { handle as handlePresentersPost } from '../../handlers/presenters-post/handle';
import { handle as handleVerifyPinPost } from '../../handlers/verify-pin-post/handle-arena-post';
import { handleError } from '../error';
import { pinAtom } from '../pin';
import { allowCrossOrigin } from './allow-cross-origin';

const port = 3001;

export function prepareServer(): void {
  const app = express();

  app.use(handleError((req, res, next) => express.json()(req, res, next)));
  app.use(handleError((req, res, next) => allowCrossOrigin(req, res, next)));

  app.get('/', (req, res) => {
    res.send(arenaAtom.get());
  });

  app.post(
    '/arena',
    handleError((req, res) => handleArenaPost(req, res)),
  );

  app.post(
    '/presenters',
    handleError((req, res) => handlePresentersPost(req, res)),
  );

  app.post(
    '/verify-pin',
    handleError((req, res) => handleVerifyPinPost(req, res)),
  );

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
    console.info(`http://${getLocalIp()}:3000?pin=${pinAtom.get()}`);
  });
}
