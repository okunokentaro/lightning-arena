/**
 * 0 or 1
 * 有効時 localhost として起動
 */
export const isEnabledLocalhost =
  (process.env.LA_ENABLED_LOCALHOST_DEBUG ?? '0') === '1';
