import { Request, Response } from 'express';

import { arenaAtom } from '../../domain/arena';

/**
 * @public
 */
export function handle(req: Request, res: Response): void {
  const { body } = req;
  console.log(body);
  arenaAtom.set(body);
  res.status(201).send();
}
