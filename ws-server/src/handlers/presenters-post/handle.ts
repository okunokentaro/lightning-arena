import { Request, Response } from 'express';
import { FromSchema } from 'json-schema-to-ts';
import { ulid } from 'ulid';
import { AssertValidJsonError } from 'universal/src/assert-valid-json';

import { presentersAtom } from '../../domain/presenter';
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

  presentersAtom.set([
    ...presentersAtom.get(),
    { id: ulid(), xAccountId: body.xAccountId, displayName: body.displayName },
  ]);

  res.status(201).send();
}
