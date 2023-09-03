import { JSONSchema7 } from 'json-schema-to-ts';

export const requestSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  additionalProperties: false,
  required: ['title', 'hashTags'],
  properties: {
    title: {
      type: 'string',
      minLength: 1,
    },
    hashTags: {
      type: 'string',
      minLength: 0,
    },
  },
} as const satisfies JSONSchema7;
