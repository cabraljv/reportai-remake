module.exports = {
  env: {
    es6: true,
  },
  extends: ['plugin:react/recommended', 'google', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'require-jsdoc': 'off',
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.js', '.tsx', '.ts'],
      },
    ],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    camelcase: 'off',
    'new-cap': 'off',
  },
};
