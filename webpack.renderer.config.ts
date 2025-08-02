import type { Configuration } from 'webpack';
import path from 'node:path';
import { plugins } from './webpack.plugins';

const isPreload = process.env.WEBPACK_RENDERER_TARGET === 'preload'; // <-- Electron Forge так определяет preload

// rules.push({
//   test: /\.css$/,
//   use: [{ loader: 'style-loader', options: { attributes: { nonce: "wcd" } } }, { loader: 'css-loader' }]
// });

console.log('isPreload', isPreload, process.env.WEBPACK_RENDERER_TARGET);

export const rendererConfig: Configuration = {
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /(node_modules|\.webpack)/,
      use: {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    },
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|\.webpack)/,
      use: {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    },
    {
      test: /\.css$/,
      use: [{ loader: 'style-loader', options: { attributes: { nonce: "wcd" } } }, { loader: 'css-loader' }]
    }]
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      "@shared": path.join(__dirname, 'src', 'shared'),
      "@api": path.join(__dirname, 'src', 'renderer', 'api')
    }
  },
};
