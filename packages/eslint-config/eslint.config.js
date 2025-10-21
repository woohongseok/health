import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['*.config.js', '*.config.cjs', '.prettierrc.js'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {},
  },
];
