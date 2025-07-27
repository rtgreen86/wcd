import { IpcRequest, IpcPayload, RequestType } from '@shared/types';
import PinGuard from '@main/services/PinGuard';
import BaseHandler from './BaseHandler';

export default class IsPinSetHandler extends BaseHandler<IpcRequest, IpcPayload> {
  async handle(request: IpcRequest): Promise<IpcPayload> {
    if (request.type !== RequestType.getPinIsExists) {
      return super.handle(request);
    }

    const pinExists = await PinGuard.getInstance().isSettedPin();
    return { flags: { pinExists } };
  }
}
