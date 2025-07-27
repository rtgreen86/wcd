import { IpcRequest, IpcPayload, RequestType } from '@shared/types';
import Authenticate from '@main/commands/Authenticate';
import BaseHandler from './BaseHandler';

export default class AuthenticateHandler extends BaseHandler<IpcRequest, IpcPayload> {
  async handle(request: IpcRequest): Promise<IpcPayload> {
    if (request.type !== RequestType.getAuthenticate) {
      return super.handle(request);
    }

    const model = this.params.model;
    const pin = request.payload?.strings?.pin || null;
    const token = await new Authenticate({ model, pin }).execute();

    return { strings: { token } };
  }
}
