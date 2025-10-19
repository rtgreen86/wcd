import IpcHandler from './IpcHandler';
import Model from '../models/Model';
import DataStorage from '../services/DataStorage';

type Request = electronAPI.IpcRequest;
type Response = electronAPI.IpcResponse;

export default class PutDataHandler extends IpcHandler {
  private readonly model: Model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  override async execute(request: Request): Promise<Response> {
    if (request.endpoint !== 'put:data') {
      return await super.execute(request);
    }

    if (!this.model.fsKey) {
      return { success: false, message: 'fsKey required.' }
    }

    const data = request.payload?.strings?.data || null

    if (data === null) {
      return { success: true }
    }

    this.model.data = data;
    await new DataStorage(this.model.fsKey).put(data); // TODO: add debaunce

    return { success: true };
  }
}
