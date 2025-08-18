import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}']
  },
  {
    languageOptions: {
      globals: globals.node,
      parser: tsParser
    }
  },
  {
    rules: {
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
]
