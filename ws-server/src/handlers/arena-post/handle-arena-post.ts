import { Request, Response } from 'express';
import { FromSchema } from 'json-schema-to-ts';
import { AssertValidJsonError } from 'universal/src/assert-valid-json';

import { arenaAtom } from '../../domain/arena';
import { BadRequestError } from '../../shared/error';
import { assertValidJson } from '../../utils/assert-valid-json';
import { requestSchema } from './request-schema';

/**
 * @public
 */
export function handle(req: Request, res: Response): void {
  const body: unknown = req.body;

  try {
    assertValidJson<FromSchema<typeof requestSchema>>(requestSchema, body);
  } catch (e) {
    if (e instanceof AssertValidJsonError) {
      throw new BadRequestError(e.message);
    }
    throw e;
  }

  arenaAtom.set({
    title: body.title,
    hashTags: body.hashTags.split(' '),
  });

  res.status(201).send();
}
