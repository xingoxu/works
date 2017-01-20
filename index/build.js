/**
 * Config
 */
const config = {
  outputRoot: '../static/',
};





/**
 * webpack build.js
 * created by xingo 2017/01/19
 */
var path = require('path')

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
  entry: {
    app: path.resolve(__dirname, './app.js'),
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: 'static/',
    // publicPath: 'http://7xin1x.com1.z0.glb.clouddn.com/works/',
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
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader'
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        }
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/bundle.[contenthash:7].css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'index/index.hbs',
      inject: true,
      filename: '../index.html',
      indexContent: require('./index-content.js'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
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