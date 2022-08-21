const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const MockStorage = require('./MockStorage');

const handleLoadRecords = () => {
  return MockStorage.load();
};

const handleSaveRecords = () => { };

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.app.js')
    }
  });

  ipcMain.handle('load-records', handleLoadRecords);
  ipcMain.handle('save-records', handleSaveRecords);

  win.loadFile('app/index.html');
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
