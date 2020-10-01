module.exports = {
  extends: ['airbnb-typescript-prettier'],
  plugins: ['react-hooks'],
  rules: {
    'no-param-reassign': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-console': 0,
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'import/no-cycle': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    'jsx-a11y/anchor-is-valid': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
}
