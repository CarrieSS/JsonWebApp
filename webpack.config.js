'use strict';

const path = require('path');
const proxy = require('./server/webpack-dev-proxy');
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');
const postcssInit = require('./webpack/postcss');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const autoprefixer = require('autoprefixer');

module.exports = {
  entry: { app: './src/index.ts' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js',
  },

  devtool: process.env.NODE_ENV === 'production' ?
    'inline-source-map' :
    'inline-source-map',

  resolve: { 
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.css', '.html'], 
  },
  plugins: plugins,
  postcss: postcssInit,

  devServer: {
    historyApiFallback: { index: '/' },
    proxy: Object.assign({}, proxy(), { '/api/*': 'http://localhost:3000' }),
  },

  module: {
    preLoaders: [
      loaders.tslint,

    ],
    loaders: [
      loaders.ts,
      loaders.html,
      { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' },
      loaders.css,
      loaders.jquery,
      // { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },
      loaders.svg,
      loaders.eot,
      loaders.woff,
      loaders.woff2,
      loaders.ttf,
      // { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
    ],
  },

  // postcss: [autoprefixer],
};
