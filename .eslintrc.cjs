module.exports = {
  root: true,
  plugins: [
    '@typescript-eslint',
    'import',
    'import-access',
    'react-hooks',
    'unused-imports',
  ],
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:tailwindcss/recommended',
    'prettier',
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
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@next/next/no-html-link-for-pages': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/react-in-jsx-scope': 'off',
    'tailwindcss/no-custom-classname': [
      'error',
      { whitelist: ['^twIgnore.*'] },
    ],
    // eslint 側を無効にして typescript-eslint 側を有効
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
  },
};
