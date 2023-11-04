import { ipcMain } from 'electron';
import * as fs from './models/fs/index';

const key = '00000000000000000000000000000000';

type SavePayload = {
  name: string,
  token: string,
  content: string,
};

type LoadPayload = {
  name: string,
  token: string,
};

export function handleIpc() {
  ipcMain.handle('fs-save-user-file', (event, payload: SavePayload) => fs.saveUserFile(payload.name, key, payload.content));
  ipcMain.handle('fs-load-user-file', (event, payload: LoadPayload) => fs.loadUserFile(payload.name, key));
}
