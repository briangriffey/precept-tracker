import tseslint from 'typescript-eslint'
import importX from 'eslint-plugin-import-x'

export default tseslint.config(
  {
    ignores: ['out/**', '.vite/**', 'node_modules/**', '*.js'],
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'import-x': importX,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      'import-x/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      'import-x/no-unresolved': ['error', { ignore: ['\\?raw$'] }],
    },
  },
)
