import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import Storage from './Storage';
import SysInfo from './SysInfo';

const fillAboutPanel = () => {
  app.setAboutPanelOptions({
    applicationName: app.getName(),
    applicationVersion: app.getVersion(),
    credits: SysInfo.get()
  });
};

const handleIpc = () => {
  ipcMain.handle('load-records', () => Storage.get());
  ipcMain.handle('save-records', (event, payload) => Storage.put(payload));
  ipcMain.handle('get-sysinfo', () => SysInfo.get());
  ipcMain.handle('show-about', () => app.showAboutPanel());
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.app.js')
    }
  });
  win.loadFile('app/index.html');
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(() => {
  fillAboutPanel();
  handleIpc();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
