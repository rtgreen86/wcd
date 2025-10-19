import IpcHandler from './IpcHandler';
import Model from '../models/Model';
import DataStorage from '../services/DataStorage';
import {initializeFSKey} from '../services/fileSystemKey';

type Request = electronAPI.IpcRequest;
type Response = electronAPI.IpcResponse;

export default class InitHandler extends IpcHandler {
  private readonly model: Model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  override async execute(request: Request): Promise<Response> {
    if (request.endpoint !== 'put:init') {
      return await super.execute(request);
    }

    await initializeFSKey();
    return { success: true };
  }
}
