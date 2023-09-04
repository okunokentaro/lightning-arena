module.exports = {
  parserOptions: { project: ['./tsconfig.json'] },
  rules: {
    'tailwindcss/no-custom-classname': [
      'error',
      {
        config: `${__dirname}/tailwind.config.js`,
        whitelist: ['^twIgnore.*'],
      },
    ],
    'tailwindcss/classnames-order': [
      'error',
      {
        config: `${__dirname}/tailwind.config.js`,
      },
    ],
  },
};
