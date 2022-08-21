/* eslint-env node */

const path = require('path');
const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = {
  mode: 'development',
  devtool: 'inline-source-map'
};

const main = {
  target: "electron-main",
  externals: [nodeExternals()],
  entry: './src/main/main.js',
  output: {
    filename: 'main.app.js',
    path: path.resolve(__dirname, 'app')
  }
};

const renderer = {
  target: 'electron-renderer',
  entry: './src/renderer/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$/i,
        use: [
          { loader: "style-loader", options: { attributes: { nonce: "wcd" } } },
          'css-loader'
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'assets/index.html'
    })
  ],
  output: {
    filename: 'renderer.app.js',
    path: path.resolve(__dirname, 'app')
  }
};

const preload = {
  target: "electron-main",
  externals: [nodeExternals()],
  entry: './src/preload/preload.js',
  output: {
    filename: 'preload.app.js',
    path: path.resolve(__dirname, 'app')
  }
};

module.exports = [
  Object.assign({}, common, main),
  Object.assign({}, common, preload),
  Object.assign({}, common, renderer)
];
