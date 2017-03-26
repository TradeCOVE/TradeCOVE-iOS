'use strict';

var webpack = require('webpack');
var config = require('./webpack.config.base.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var SaveAssetsJson = require('assets-webpack-plugin');

config.bail = true;
config.debug = false;
config.profile = false;
config.devtool = '#source-map';

config.output = {
  path: './client/dist',
  pathInfo: true,
  publicPath: '/client/dist/',
  filename: 'bundle.min.js'
};

config.plugins = config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    compress: {
      warnings: false,
      screw_ie8: true
    }
  }),
  new SaveAssetsJson({
    path: process.cwd(),
    filename: 'assets.json'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new HtmlWebpackPlugin({
    template: 'server/views/distpage.html',
    inject: false
  }),
  new CopyWebpackPlugin([
      { from: 'client/externals', to: './' },
    ], {
      copyUnmodified: true
    })
]);

config.module.loaders = config.module.loaders.concat([
  {test: /\.jsx?$/, loaders: [ 'babel'], exclude: /node_modules/}
]);

module.exports = config;
