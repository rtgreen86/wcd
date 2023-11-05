import { ipcMain } from 'electron';
import { userData } from '../models/fs';

const key = '00000000000000000000000000000000';

export default function handleIpc() {
  ipcMain.on('fs:put', (event, filename: string, options: electronAPI.fs.SaveOptions) => {
    userData.put(filename, key, options.body);
  });

  ipcMain.handle('fs:get', (event, filename: string) => userData.get(filename, key));
}
