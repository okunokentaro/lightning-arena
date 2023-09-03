import { NextFunction, Request, Response } from 'express';

import { BadRequestError } from './bad-request-error';
import { InternalServerError } from './internal-server-error';

type Callback = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;

export function handleError(
  cb: Callback,
): (req: Request, res: Response, next: NextFunction) => void {
  return (req, res, next): void => {
    (async (): Promise<void> => {
      try {
        await cb(req, res, next);
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message);
          // no return
        }

        if (e instanceof BadRequestError) {
          res.status(400).end(e.message);
          next(e);
          return;
        }

        if (e instanceof InternalServerError) {
          res.status(500).end(e.message);
          next(e);
          return;
        }

        next(e);
        return;
      }
    })().catch((e) => {
      next(e);
    });
  };
}
