/**
 * @public
 */
export type UnArray<T> = T extends (infer A)[] | readonly (infer A)[]
  ? A
  : never;
