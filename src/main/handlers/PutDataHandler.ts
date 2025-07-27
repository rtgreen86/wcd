import { IpcRequest, IpcPayload, RequestType } from '@shared/types';
import PutData from '@main/commands/PutData';
import BaseHandler from './BaseHandler';

export default class DataHandler extends BaseHandler<IpcRequest, IpcPayload> {
  async handle(request: IpcRequest): Promise<IpcPayload> {
    if (request.type !== RequestType.putData) {
      return super.handle(request);
    }

    const model = this.params.model;
    const data = request.payload?.strings?.data;

    if (!data) {
      throw new Error('strings.data is required.');
    }

    await new PutData({ model, data }).execute();
    return {};
  }
}
