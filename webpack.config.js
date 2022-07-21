/* eslint-env node */

const path = require('path');
const nodeExternals = require("webpack-node-externals");

const common = {
  mode: 'production'
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
  output: {
    filename: 'renderer.app.js',
    path: path.resolve(__dirname, 'app')
  }
};

module.exports = [
  Object.assign({}, common, main),
  Object.assign({}, common, renderer)
];
