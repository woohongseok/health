import { base } from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export const reactNative = [
  ...base,
  {
    languageOptions: {
      globals: {
        __DEV__: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        navigator: 'readonly',
        XMLHttpRequest: 'readonly',
      },
    },
  },
];
