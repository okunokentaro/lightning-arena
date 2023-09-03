import { NextFunction, Request, Response } from 'express';
import { URL } from 'url';

import { getLocalIp } from '../universal';

export const allowList: RegExp[] = [
  /^http:\/\/localhost:3000$/,
  new RegExp(`^http:\\/\\/${getLocalIp()}:3000$`),
];

export function allowCrossOrigin(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (typeof req.headers.origin !== 'string') {
    next();
    return;
  }

  const { origin } = new URL([req.headers.origin, req.path].join(''));

  const isAllowed = allowList.some((v) => v.test(origin));
  if (!isAllowed) {
    res.status(403).end();
    return;
  }

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next();
}
