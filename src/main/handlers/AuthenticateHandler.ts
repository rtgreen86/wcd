import { IPCRequest, IPCResponse } from '@shared/types';
import { RequestType } from '@shared/enums';

import PinGuard from '@main/services/PinGuard';
import Authenticate from '@main/commands/Authenticate';
import BaseHandler from './BaseHandler';

export default class AuthenticateHandler extends BaseHandler<IPCRequest, IPCResponse> {
  async handle(request: IPCRequest): Promise<IPCResponse> {
    if (request.type === RequestType.PIN_IS_EXISTS) {
      return {
        type: RequestType.PIN_IS_EXISTS,
        payload: {
          isExists: await PinGuard.getInstance().isSettedPin()
        }
      }
    }

    if (request.type === RequestType.AUTHENTICATE) {
      return {
        type: RequestType.AUTHENTICATE,
        payload: {
          token: await new Authenticate({
            model: this.params.model,
            pin: request.payload?.pin || null
          }).execute()
        }
      }
    }

    return super.handle(request);
  }
}
