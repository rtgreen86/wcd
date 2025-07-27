import { IpcRequest, IpcPayload, RequestType } from '@shared/types';
import PinGuard from '@main/services/PinGuard';
import BaseHandler from './BaseHandler';

export default class PutPinHandler extends BaseHandler<IpcRequest, IpcPayload> {
  async handle(request: IpcRequest): Promise<IpcPayload> {
    if (request.type !== RequestType.putPin) {
      return super.handle(request);
    }

    const pin = request.payload?.strings?.pin || null;
    const newPin = request.payload?.strings?.newPin || null;
    const success = await PinGuard.getInstance().setPin(pin, newPin);
    return { flags: { success } }
  }
}
