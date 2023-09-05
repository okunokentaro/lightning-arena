import { FromSchema, JSONSchema7 } from 'json-schema-to-ts';
import { redirect } from 'next/navigation';
import { ReactElement } from 'react';

import { AssertValidJsonError } from 'universal/src/assert-valid-json';
import { AppPagePresentation } from '../client';
import { assertValidJson } from '../utils/assert-valid-json';

type Params = Readonly<{
  searchParams: Record<string, string | string[] | undefined>;
}>;

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  additionalProperties: false,
  required: ['code'],
  properties: {
    code: {
      type: 'string',
      minLength: 4,
      maxLength: 64,
    },
  },
} as const satisfies JSONSchema7;

export default function AppPage({ searchParams }: Params): ReactElement {
  try {
    assertValidJson<FromSchema<typeof schema>>(schema, searchParams);
  } catch (e) {
    if (e instanceof AssertValidJsonError) {
      redirect('/arena');
    }
    throw e;
  }
  return <AppPagePresentation code={searchParams.code} />;
}
