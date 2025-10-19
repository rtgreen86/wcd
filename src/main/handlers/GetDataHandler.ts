import IpcHandler from './IpcHandler';
import Model from '../models/Model';
import DataStorage from '../services/DataStorage';

type Request = electronAPI.IpcRequest;
type Response = electronAPI.IpcResponse;

export default class GetDataHandler extends IpcHandler {
  private readonly model: Model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  override async execute(request: Request): Promise<Response> {
    if (request.endpoint !== 'get:data') {
      return await super.execute(request);
    }

    if (!this.model.fsKey) {
      return { success: false, message: 'fsKey required.' }
    }

    if (!this.model.data) {
      try {
        await this.loadData();
      } catch (error) {
        return {
          success: false,
          message: error?.message || 'Unexpected error on loading data',
        };
      }
    }

    return {
      success: true,
      payload: {
        strings: { data: this.model.data as string }
      }
    };
  }

  private async loadData() {
    this.model.data = await new DataStorage(this.model.fsKey).get();
  }
}
