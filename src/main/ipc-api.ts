import { ipcMain } from 'electron';
import * as fs from './models/fs/index';

const key = '00000000000000000000000000000000';

export function handleIpc() {
  ipcMain.handle('fs-save-user-file', (event, payload: electronAPI.SavePayload) => fs.saveUserFile(payload.name, key, payload.content));
  ipcMain.handle('fs-load-user-file', (event, payload: electronAPI.LoadPayload) => fs.loadUserFile(payload.name, key));
}
