import { Request, Response } from 'express';

/**
 * @public
 */
export function handle(req: Request, res: Response): void {
  const { body } = req;
  console.log(body);
  res.status(201).send();
}
