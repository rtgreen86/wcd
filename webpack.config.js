/* eslint-env node */

const path = require('path');

module.exports = {
  target: 'electron-renderer',
  entry: './src/renderer/index.js',
  output: {
    filename: 'renderer.app.js',
    path: path.resolve(__dirname, 'app')
  }
}
