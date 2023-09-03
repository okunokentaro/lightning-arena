module.exports = {
  plugins: ['@typescript-eslint', 'import', 'unused-imports', 'import-access'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'next/core-web-vitals',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: ['./tsconfig.json'] },
  ignorePatterns: ['*.js'],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'parent',
          'sibling',
          'index',
          'object',
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-console': ['error', { allow: ['info', 'error'] }],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'import-access/jsdoc': ['error', { defaultImportability: 'package' }],
    // eslint 側を無効にして typescript-eslint 側を有効
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
  },
};
