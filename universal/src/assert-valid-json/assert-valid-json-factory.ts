import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import { PreconditionError } from '../precondition-error';
import { AssertValidJsonError } from './assert-valid-json-error';
import { buildMessages } from './build-messages';

type Schema = Parameters<
  ReturnType<ReturnType<typeof addFormats>['addSchema']>['compile']
>[0];

type Return<T> = (schema: unknown, obj: unknown) => asserts obj is T;

export function assertValidJsonFactory<T>(
  defs: Parameters<ReturnType<typeof addFormats>['addSchema']>[0],
): Return<T> {
  return function assertValidJson<T>(
    schema: unknown,
    obj: unknown,
  ): asserts obj is T {
    const validate = addFormats(new Ajv())
      .addSchema(defs)
      .compile(schema as Schema);

    const isValid = validate(obj);
    if (isValid instanceof Promise) {
      throw new PreconditionError('async validate is not supported');
    }
    if (!isValid) {
      throw new AssertValidJsonError(buildMessages(validate.errors));
    }

    // noop
  };
}
