import { IpcRequest, IpcPayload, RequestType } from '@shared/types';
import PinGuard from '@main/services/PinGuard';
import BaseHandler from './BaseHandler';

export default class DeletePinHandler extends BaseHandler<IpcRequest, IpcPayload> {
  async handle(request: IpcRequest): Promise<IpcPayload> {
    if (request.type !== RequestType.deletePin) {
      return super.handle(request);
    }
    const pin = request.payload?.strings?.pin || null;
    const success = await PinGuard.getInstance().removePin(pin)
    return { flags: { success } };
  }
}
