import Model from '@main/models/Model';

import { IPCRequest, IPCResponse } from '@shared/types';
import { RequestType } from '@shared/enums';

import VerifyPIN from '@main/commands/security/VerifyPIN';
import Authenticate from '@main/commands/security/Authenticate';
import BaseHandler from './BaseHandler';

export default class AuthenticateHandler extends BaseHandler<IPCRequest, IPCResponse> {
  async handle(request: IPCRequest): Promise<IPCResponse> {
    if (request.type === RequestType.PIN_IS_EXISTS) {
      return {
        type: RequestType.PIN_IS_EXISTS,
        payload: {
          isExists: !(await new VerifyPIN({ pin: null }).execute())
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
