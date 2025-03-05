module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'import/no-unresolved': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'no-warning-comments': 'error',
    'no-unused-vars': 'error',
    'linebreak-style': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'eol-last': 'off',
    'no-trailing-spaces': 'off',
  },
}
