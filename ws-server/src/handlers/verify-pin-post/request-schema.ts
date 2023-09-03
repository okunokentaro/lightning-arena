import { JSONSchema7 } from 'json-schema-to-ts';

export const requestSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  additionalProperties: false,
  required: ['pin'],
  properties: {
    pin: {
      type: 'string',
      minLength: 4,
      maxLength: 4,
    },
  },
} as const satisfies JSONSchema7;
