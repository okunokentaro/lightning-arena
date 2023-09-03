import { ErrorObject } from 'ajv';

export function buildMessages(
  errors: /* readwrite */ ErrorObject[] | null | undefined,
): readonly string[] {
  if (!Array.isArray(errors)) {
    return [];
  }

  // 重複除去
  return [
    ...new Set(
      errors.map((v) => {
        return [
          v.message ?? '',
          `(${v.instancePath !== '' ? v.instancePath : '/'})`,
        ].join(' ');
      }) ?? [],
    ),
  ];
}
