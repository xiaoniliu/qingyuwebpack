const path = require('path');
const webpack = require('webpack');

module.exports = {
  /**
   * webpack入口
   * 简化写法
   * 也可以使用对象的形式，
   * {
   *  entry1: 'xxx',
   *  entry2: 'xxx'
   * }
   * 同时指定多个入口打包是会生成多个文件
   */
  entry: `${__dirname}/src/index.js`,
  /**
   *  mode 模式
   *  指定process.env.NODE_ENV环境变量 也可以在package.json的scripts中指定--mode=xxx
   *  1. mode=development时会默认启用 NamedChunksPlugin 和 NamedModulesPlugin。
   *  2. mode=production时会默认启用 FlagDependencyUsagePlugin, 
   *  FlagIncludedChunksPlugin, ModuleConcatenationPlugin,
   *  NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, 
   *  SideEffectsFlagPlugin 和 UglifyJsPlugin。
   */
  mode: 'production',
  /**
   * 编译后文件输出的位置
   * [name] name占位符，如果指定了多个入口，可以通过name获取入口配置名称（上面的entry1和entry2）插入打包后的文件名，便于区分。
   * [hash] hash占位符
   */
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `bundle.[hash].js`,
  },
};
