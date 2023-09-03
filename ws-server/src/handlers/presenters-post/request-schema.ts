import { JSONSchema7 } from 'json-schema-to-ts';

export const requestSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  anyOf: [
    {
      type: 'object',
      additionalProperties: false,
      required: ['xAccountId', 'displayName'],
      properties: {
        xAccountId: {
          type: 'string',
          minLength: 1,
        },
        displayName: {
          type: 'string',
          minLength: 0,
        },
      },
    },
    {
      type: 'object',
      additionalProperties: false,
      required: ['xAccountId', 'displayName'],
      properties: {
        xAccountId: {
          type: 'string',
          minLength: 0,
        },
        displayName: {
          type: 'string',
          minLength: 1,
        },
      },
    },
  ],
} as const satisfies JSONSchema7;
