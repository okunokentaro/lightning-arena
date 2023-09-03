export class AssertValidJsonError extends Error {
  constructor(readonly reasons: readonly string[]) {
    super(reasons.map((v) => `"${v}"`).join(', '));
  }
}
