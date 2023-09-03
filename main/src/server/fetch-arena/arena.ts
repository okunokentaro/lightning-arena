import { FromSchema } from 'json-schema-to-ts';

import { schema } from './schema';

export type Arena = FromSchema<typeof schema>;
