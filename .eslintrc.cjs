module.exports = {
  root: true,
  ignorePatterns: ['vite.config.js'],
  extends: ['standard'],
  plugins: ['svelte3', '@babel'],
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  settings: {
    'svelte3/ignore-styles': () => true,
  },
  rules: {
    indent: ['error', 2],
    semi: ['error', 'always'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'never',
        functions: 'never',
      },
    ],
    'operator-linebreak': ['error', 'after'],
    'space-before-function-paren': ['error', 'never'],
    eqeqeq: 'warn',
    'no-unused-vars': ['warn', { args: 'after-used' }],
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 2 }],
        'import/first': 'off',
        'import/no-duplicates': 'off',
        'import/no-mutable-exports': 'off',
        'import/no-unresolved': 'off',
        indent: ['error', 2],
      },
    },
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
    requireConfigFile: false,
  },
};
