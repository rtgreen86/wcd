import { IpcRequest, IpcPayload, RequestType } from '@shared/types';
import BaseHandler from './BaseHandler';

export default class GetDataHandler extends BaseHandler<IpcRequest, IpcPayload> {
  handle(request: IpcRequest): Promise<IpcPayload> {
    if (request.type !== RequestType.getData) {
      return super.handle(request);
    }

    return Promise.resolve({
      strings: { data: this.params.model.data }
    });
  }
}
