import { ipcMain } from 'electron';
import Model from '../models/Model';
import { AuthHandler } from './AuthHandler';
import { ChangePinHandler } from './ChangePinHandler';
import { DataHandler } from './DataHandler';
import { ExportHandler } from './ExportHandler';
import { Handler } from './Handler';
import { InitHandler } from './InitHandler';
import { ProtectionHandler } from './ProtectionHandler';
import { UnsupportedHandler } from './UnsupportedHandler';

export function subscribe(model: Model) {
  const handlers = Handler.chain([
    new AuthHandler(),
    new ProtectionHandler(),
    new InitHandler(model),
    new ChangePinHandler(),
    new DataHandler(),
    new ExportHandler(),
    new UnsupportedHandler(),
  ]);

  ipcMain.handle('ipc-dispatch', (event, request: IpcRequest) => {
    return handlers.handle(request);
  });
}
