import { FromSchema } from 'json-schema-to-ts';

import { assertValidJson } from '../../utils/assert-valid-json';
import { Arena } from './arena';
import { schema } from './schema';

export async function fetchArena(ip: string): Promise<Arena | null> {
  const res = await fetch(`http://${ip}:3001`, {
    method: 'GET',
    cache: 'no-store',
  });

  let json: unknown;
  try {
    json = await res.json();
  } catch (e) {
    if (e instanceof Error) {
      return null;
    }
    throw e;
  }

  assertValidJson<FromSchema<typeof schema>>(schema, json);

  return json;
}
