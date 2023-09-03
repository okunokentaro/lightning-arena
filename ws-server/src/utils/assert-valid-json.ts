import { assertValidJsonFactory } from 'universal/src/assert-valid-json';

/**
 * @public
 */
export function assertValidJson<T>(
  schema: unknown,
  obj: unknown,
): asserts obj is T {
  return assertValidJsonFactory<T>([])(schema, obj);
}
