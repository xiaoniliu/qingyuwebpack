const path = require('path');
const webpack = require('webpack');
// webpack进度条
const WebpackBar = require('webpackbar');
// 获取当前正在运行的node脚本
const SCRIPT = process.env.npm_lifecycle_event;
const mode = SCRIPT === 'build' ? 'production' : 'development';
const { log } = console;

log(`run script [${SCRIPT}] env [${mode}]`);
module.exports = {
  /**
   * webpack入口
   * 简化写法
   * 也可以使用对象的形式，
   * {
   *  entry1: 'xxx',
   *  entry2: 'xxx'
   * }
   * 同时指定多个入口打包时会生成多个文件
   */
  entry: path.join(__dirname, '/src/index.js'),
  /**
   *  mode 模式
   *  指定process.env.NODE_ENV环境变量 也可以在package.json的scripts中指定--mode=xxx
   *  1. mode=development时会默认启用 NamedChunksPlugin 和 NamedModulesPlugin。
   *  2. mode=production时会默认启用 FlagDependencyUsagePlugin,
   *  FlagIncludedChunksPlugin, ModuleConcatenationPlugin,
   *  NoEmitOnErrorsPlugin, OccurrenceOrderPlugin,
   *  SideEffectsFlagPlugin 和 UglifyJsPlugin。
   */
  mode,
  /**
   * 编译后文件输出的位置
   * [name] name占位符，如果指定了多个入口，可以通过name获取入口配置名称（上面的entry1和entry2）插入打包后的文件名，便于区分。
   * [hash] hash占位符
   */
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.[hash].js',
  },
  /**
   * 定义一些loader
   * 参考https://cloud.tencent.com/developer/section/1477522
   * 以下user内的几种写法效果相同
   */
  module: {
    /**
     * 定义rules数组
     */
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: {} }],
        include: path.resolve(__dirname, 'src'),
      },
      /**
       * 如果使用了ejs(js 模板标签语法<%= xxx %>)语法，html-loader会与html-webpack-plugin冲突
       */
      {
        test: /\.(html|htm)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        },
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: ['file-loader'],
        include: path.resolve(__dirname, 'src'),
      },
      /**
       * babel注意事项
       * 以下的替换在使用 7.x (含7以上)
       *babel-core 替换为 @babel/core
       *|- 因为babel-core支持到 babel 6.x， 如果使用 6.x 以上则需要修改，而且不可以两个都安装，可能会出现冲突的问题。
       *babel-preset-* 替换为 @babel/preset-*
       *|- 比如使用 babel-preset-env 则需要换成 @babel/preset-env，在 .babelrc 配置文件中的 "presets": ["env"] 也需要修改为 "presets": ["@babel/preset-env"]。
       *babel-plugin-* 替换为 @babel/plugin-*
       *|- 比如使用 babel-plugin-transform-runtime 则需要替换为 @babel/plugin-transform-runtime； .babelrc配置文件也要相应的修改。
       */
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        // 排除掉node_module目录
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    /**
     * 进度条插件
     */
    new WebpackBar(),
  ],
};
