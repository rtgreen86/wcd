import { ipcMain } from 'electron';
import Model from '../models/Model';
import { Pipeline } from '@shared/infrastructure';

import Handler from './Handler';
import CheckHasPinHandler from './CheckHasPinHandler';
import PinHandler from './PinHandler';
import ProtectionHandler from './ProtectionHandler';

import ExportHandler from './ExportHandler';

export function subscribeHandlers(model: Model) {
  const handlers = Handler.CreateChain([
    new CheckHasPinHandler(),
    new ProtectionHandler(model),
    new PinHandler(),
  ]);

  ipcMain.handle('ipc-request', (event, request) => handlers.execute(request));

  const pipeline = new Pipeline([
    new ExportHandler(model),
  ]);

  ipcMain.handle('ipc-request-2', (event, request) => pipeline.execute(request));
}
