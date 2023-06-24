import { ipcMain } from 'electron';
import * as Storage from './Storage';

export function handleIpc() {
  ipcMain.handle('storage-get', (event, filename: string) => Storage.get(filename));
  ipcMain.handle('storage-put', (event, filename: string, content: string) => Storage.put(filename, content));
}
