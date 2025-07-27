import { IPCRequest, IPCResponse } from '@shared/types';
import { RequestType } from '@shared/enums';
import PinGuard from '@main/services/PinGuard';
import BaseHandler from './BaseHandler';

export default class PinHandler extends BaseHandler<IPCRequest, IPCResponse> {
  async handle(request: IPCRequest): Promise<IPCResponse> {
    if (request.type === RequestType.PIN_SET) {
      return {
        type: RequestType.PIN_SET,
        payload: {
          success: await PinGuard.getInstance().setPin(
            request.payload.pin,
            request.payload.newPin
          )
        }
      }
    }

    if (request.type === RequestType.PIN_REMOVE) {
      return {
        type: RequestType.PIN_REMOVE,
        payload: {
          success: await PinGuard.getInstance().removePin(request.payload.pin)
        }
      }
    }

    return super.handle(request);
  }
}
