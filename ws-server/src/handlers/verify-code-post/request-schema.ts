import { JSONSchema7 } from 'json-schema-to-ts';

export const requestSchema = {
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
