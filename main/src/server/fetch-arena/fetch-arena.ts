import { FromSchema } from 'json-schema-to-ts';

import { assertValidJson } from '../../utils/assert-valid-json';
import { Arena } from './arena';
import { schema } from './schema';

export async function fetchArena(ip: string): Promise<Arena> {
  const res = await fetch(`http://${ip}:3001`, { method: 'GET' });
  const json: unknown = await res.json();

  assertValidJson<FromSchema<typeof schema>>(schema, json);

  return json;
}
