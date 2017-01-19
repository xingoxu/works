/**
 * Config
 */
const config = {
  outputRoot: '../',
};





/**
 * webpack build.js
 * created by xingo 2017/01/19
 */
var path = require('path')

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
  entry: {
    app: './index/app.js',
  },
  output: {
    filename: 'js/[name].js',
    // publicPath: 'http://7xin1x.com1.z0.glb.clouddn.com/',
    path: path.resolve(__dirname, config.outputRoot),
  },
  module: {
    rules: [
      {
        test: /\.(hbs|handlebars)$/,
        loader: "handlebars-loader",
        options: {
          helperDirs: [path.resolve(__dirname, './helpers')],
          partialDirs: [path.resolve(__dirname, './partials')]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index/index.hbs',
      inject: true,
      filename: 'index.html',
      indexContent: require('./index-content.js'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

var ora = require('ora');
var spinner = ora('building for production...');
spinner.start();
webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
});