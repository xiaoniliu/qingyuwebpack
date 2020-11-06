/**
 * 0 = off 忽略
 * 1 = warn 警告
 * 2 = error 错误
 * 建议使用 standard 代码规范
 * 需要安装 standard eslint-plugin-standard eslint-config-standard prettier prettier-plugin-prettier prettier-config-standard
 */
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base', 'standard', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 1,
    'prettier/prettier': 2,
  },
};
