import { ipcMain } from 'electron';
import Model from '../models/Model';

import Handler from './Handler';
import CheckHasPinHandler from './CheckHasPinHandler';
import PinHandler from './PinHandler';
import ProtectionHandler from './ProtectionHandler';
import GetDataHandler from './GetDataHandler';
import PutDataHandler from './PutDataHandler';
import InitHandler from './InitHandler';

export function subscribeHandlers(model: Model) {
  const handlers = Handler.CreateChain([
    new InitHandler(model),
    new CheckHasPinHandler(),
    new ProtectionHandler(model),
    new PinHandler(),
    new GetDataHandler(model),
    new PutDataHandler(model)
  ]);

  ipcMain.handle('ipc-request', (event, request) => handlers.execute(request));
}
