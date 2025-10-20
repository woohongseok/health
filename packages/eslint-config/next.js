import { base } from './base.js';
import pluginNext from '@next/eslint-plugin-next';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export const next = [
  ...base,
  {
    plugins: {
      '@next/next': pluginNext,
    },
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
];
