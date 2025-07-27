import { IPCRequest, IPCResponse } from '@shared/types';
import { RequestType } from '@shared/enums';
import PutData from '@main/commands/PutData';
import BaseHandler from './BaseHandler';

export default class DataHandler extends BaseHandler<IPCRequest, IPCResponse> {
  async handle(request: IPCRequest): Promise<IPCResponse> {
    if (request.type === RequestType.DATA_GET) {
      return {
        type: RequestType.DATA_GET,
        payload: {
          data: this.params.model.data
        }
      }
    }

    if (request.type === RequestType.DATA_PUT) {
      await new PutData({
        model: this.params.model,
        data: request.payload.data,
      });
      return {type: RequestType.DATA_PUT}
    }

    return super.handle(request);
  }
}
