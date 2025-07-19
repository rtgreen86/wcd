import { IPCRequest, IPCResponse } from '@shared/types';
import { RequestType } from '@shared/enums';
import SetPIN from '@main/commands/security/SetPIN';
import RemovePIN from '@main/commands/security/RemovePIN';
import BaseHandler from './BaseHandler';

export default class PinHandler extends BaseHandler<IPCRequest, IPCResponse> {
  async handle(request: IPCRequest): Promise<IPCResponse> {
    if (request.type === RequestType.PIN_SET) {
      return {
        type: RequestType.PIN_SET,
        payload: {
          success: await new SetPIN({
            pin: request.payload.pin,
            newPin: request.payload.newPin
          }).execute()
        }
      }
    }

    if (request.type === RequestType.PIN_REMOVE) {
      return {
        type: RequestType.PIN_REMOVE,
        payload: {
          success: await new RemovePIN({
            pin: request.payload.pin,
          }).execute()
        }
      }
    }

    return super.handle(request);
  }
}
