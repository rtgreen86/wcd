import type { Configuration } from 'webpack';
import path from 'node:path';
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader', options: { attributes: { nonce: "wcd" } } }, { loader: 'css-loader' }]
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      "@shared": path.join(__dirname, 'src', 'shared'),
      "@main": path.join(__dirname, 'src', 'main')
    }
  },
};
