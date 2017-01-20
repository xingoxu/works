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
var assetsPath = path.resolve(__dirname, config.outputRoot);
var processEnv = process.argv[2]; // 'build','dev'

var webpackConfig = {
  entry: {
    app: path.resolve(__dirname, './app.js'),
  },
  output: {
    filename: 'js/[name].[chunkhash:3].js',
    chunkFilename: 'js/[name].[chunkhash:3].js',
    publicPath: processEnv == 'dev' ? 'static/' : '/static/',
    // publicPath: 'http://7xin1x.com1.z0.glb.clouddn.com/works/', 自动上传七牛  待做
    path: assetsPath,
  },
  module: {
    rules: [{
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
          loader: 'css-loader?minimize=true',
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          "presets": [
            ["es2015", {
              "modules": false
            }]
          ]
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
      minify: processEnv == 'dev' ? false : {
        removeComments: true,
        collapseWhitespace: true
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
    })
  ]
};

if (processEnv == 'dev') {
  var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
  webpackConfig.plugins.push(new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    server: {
      baseDir: [path.resolve(assetsPath,'../')]
    }
  }));
  webpackConfig.watch = true;
  webpackConfig.watchOptions = {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  }
  compile(webpackConfig);
} else {
  compile(webpackConfig);
}



function compile(webpackConfig) {
  var ora = require('ora');
  var spinner = ora('building for production...');
  spinner.start();

  require('shelljs/global');
  rm('-rf', assetsPath);
  return webpack(webpackConfig, function (err, stats) {
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
}