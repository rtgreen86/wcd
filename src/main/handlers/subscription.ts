import { ipcMain } from 'electron';
import Model from '../models/Model';
import { Pipeline } from '@shared/infrastructure';

import Handler from './Handler';
import CheckHasPinHandler from './CheckHasPinHandler';
import PinHandler from './PinHandler';
import ProtectionHandler from './ProtectionHandler';
import GetDataHandler from './GetDataHandler';
import PutDataHandler from './PutDataHandler';
import InitHandler from './InitHandler';

import ExportHandler from './ExportHandler';

export function subscribeHandlers(model: Model) {
  const handlers = Handler.CreateChain([
    new CheckHasPinHandler(),
    new ProtectionHandler(model),
    new PinHandler(),
    new GetDataHandler(model),
    new PutDataHandler(model)
  ]);

  ipcMain.handle('ipc-request', (event, request) => handlers.execute(request));
  ipcMain.handle('init', () => new InitHandler(model).execute());

  const pipeline = new Pipeline([
    new ExportHandler(model),
  ]);

  ipcMain.handle('ipc-request-2', (event, request) => pipeline.execute(request));
}
