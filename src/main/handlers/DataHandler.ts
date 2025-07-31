import BaseHandler from './BaseHandler';
import PutData from '@main/commands/PutData';

export default class DataHandler extends BaseHandler<electronAPI.IpcRequest, electronAPI.IpcResponse> {
  async handle(request: electronAPI.IpcRequest): Promise<electronAPI.IpcResponse> {
    if (request.type === 'get:data') {
      return {
        success: true,
        strings: { data: this.model.data }
      }
    }

    if (request.type === 'put:data') {
      const model = this.model;
      const data = request.data;

      if (!data) {
        throw new Error('data is required.');
      }

      await new PutData({ model, data }).execute();
      return { success: true };
    }

    return super.handle(request);
  }
}
