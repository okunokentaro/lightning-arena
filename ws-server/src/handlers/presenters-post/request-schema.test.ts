import { AssertValidJsonError } from 'universal/src/assert-valid-json';
import { describe, test, expect } from 'vitest';

import { assertValidJson } from '../../utils/assert-valid-json';
import { requestSchema } from './request-schema';

describe('requestSchema', () => {
  describe('正常系', () => {
    (
      [
        {
          description:
            'xAccountId が満たされているとき displayName の空欄を許容',
          actual: { xAccountId: 'a', displayName: '' },
        },
        {
          description:
            'displayName が満たされているとき xAccountId の空欄を許容',
          actual: { xAccountId: '', displayName: 'a' },
        },
        {
          description: 'すべてのプロパティが満たされることを許容',
          actual: { xAccountId: 'a', displayName: 'a' },
        },
      ] as const
    ).forEach((v) => {
      test(v.description, () => {
        expect(() => {
          assertValidJson(requestSchema, v.actual);
        }).not.toThrow();
      });
    });
  });

  describe('異常系', () => {
    (
      [
        {
          description: 'すべてのプロパティが空文字列は例外',
          actual: { xAccountId: '', displayName: '' },
        },
        {
          description: '部分的なプロパティの undefined は例外 "displayName"',
          actual: { xAccountId: 'a' },
        },
        {
          description: '部分的なプロパティの undefined は例外 "xAccountId"',
          actual: { displayName: 'a' },
        },
      ] as const
    ).forEach((v) => {
      test(v.description, () => {
        expect(() => {
          assertValidJson(requestSchema, v.actual);
        }).toThrow(AssertValidJsonError);
      });
    });
  });
});
