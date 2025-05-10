import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import stylisticJS from '@stylistic/eslint-plugin'

export default defineConfig([
  js.configs.recommended,
  stylisticJS.configs.recommended,
  {
    files: [
      '**/*.{js,mjs,cjs}',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    ignores: [
      '*/dist/**',
    ],
  },
])
