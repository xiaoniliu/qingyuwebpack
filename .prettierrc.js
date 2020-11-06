/**
 * prettier 相关配置
 */
module.exports = {
  trailingComma: 'es5',
  semi: true,
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  /**
   * 覆盖某些规则，例如html格式化不加分号
   */
  overrides: [
    {
      files: '*.html',
      options: {
        semi: false,
      },
    },
  ],
  arrowParens: 'always',
};
