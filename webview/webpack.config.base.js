var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var postcssNested = require('postcss-nested');
var postcssMixins = require('postcss-mixins');
var postcssSimpleVars = require('postcss-simple-vars');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NODE_ENV = process.env.NODE_ENV;

var env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined'
};

Object.assign(env, {
  build: (env.production || env.staging)
});

module.exports = {
  target: 'web',

  entry: [
    'babel-polyfill',
    './client/app.js'
  ],

  output: {
    path: path.join(process.cwd(), '/client'),
    pathInfo: true,
    publicPath: 'http://y.mgbeta.ru:3000/client/',
    filename: 'main.js'
  },

  resolve: {
    root: path.join(__dirname, ''),
    modulesDirectories: [
      'web_modules',
      'node_modules',
      'client'
    ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
      __CURRENT_ENV__: '\'' + (NODE_ENV) + '\''
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],

  module: {
    loaders: [
      {
          test: /\.(s)?css$/,
          loader: 'style-loader!css-loader!postcss-loader'
      },
    ],

    noParse: /\.min\.js/
  },
  postcss(wp) {
      return [
          postcssImport({addDependencyTo: wp}),
          postcssMixins(),
          postcssSimpleVars(),
          postcssNested(),
          autoprefixer({
              browsers: ['last 2 versions', '> 2%']
          })
      ];
  }
};
