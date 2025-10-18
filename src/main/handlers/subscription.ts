import { ipcMain } from 'electron';
import Model from '../models/Model';

import Handler from './Handler';
import ProtectionHandler from './ProtectionHandler';

export function subscribeHandlers(model: Model) {
  const handlers = Handler.CreateChain([
    new ProtectionHandler(model)
  ]);
  ipcMain.handle('ipc-request', (event, request) => handlers.execute(request));
}
