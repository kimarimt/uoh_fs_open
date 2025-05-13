import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

const customized = stylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: false,
  blockSpacing: true,
  commaDangle: 'always-multiline',
})

export default defineConfig([
  js.configs.recommended,
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
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      ...customized.rules,
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
