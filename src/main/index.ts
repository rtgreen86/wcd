import { app, BrowserWindow, ipcMain } from 'electron';
import SysInfo from './SysInfo';

import { initializeKey, Model } from './models';

import { ChainOfResponsibility } from '../lib/chain-of-responsibility';

import AuthenticateController from './controllers/AuthenticateController';
import GetDataController from './controllers/GetDataController';
import PutDataController from './controllers/PutDataController';
import RemoveDataController from './controllers/RemoveDataController';

declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const fillAboutPanel = () => {
  app.setAboutPanelOptions({
    applicationName: app.getName(),
    applicationVersion: app.getVersion(),
    credits: SysInfo.get()
  });
};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // [Bug]: Electron sandbox_bundle.js script failed to run #32133
  // see: https://github.com/electron/electron/issues/32133

  // import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
  // installExtension(REACT_DEVELOPER_TOOLS)
  //       .then((name) => console.log(`Added Extension:  ${name}`))
  //       .catch((err) => console.log('An error occurred: ', err));
  // installExtension(REDUX_DEVTOOLS)
  //       .then((name) => console.log(`Added Extension:  ${name}`))
  //       .catch((err) => console.log('An error occurred: ', err));

  await initializeKey();
  const model = new Model();

  const router = new ChainOfResponsibility<WCD.Request, Promise<WCD.Response>>([
    new AuthenticateController(model),
    new GetDataController(),
    new PutDataController(),
    new RemoveDataController()
  ]);

  ipcMain.handle('send-request', (event, request: WCD.Request) => router.handle(request));
  ipcMain.handle('show-about', () => app.showAboutPanel());

  fillAboutPanel();
  createWindow();
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
