/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import './lib/GoogleIcons';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ProvideAuth } from './features/auth/ProvideAuth';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

// Next https://redux.js.org/tutorials/essentials/part-6-performance-normalization#normalizing-data

const container: Element = document.getElementById('app');
const root: ReactDOM.Root = ReactDOM.createRoot(container);
root.render(
  <ProvideAuth>
      <App />
  </ProvideAuth>
);
