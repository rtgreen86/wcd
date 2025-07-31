import Authenticate from '@main/commands/Authenticate';
import BaseHandler from './BaseHandler';

export default class AuthenticateHandler extends BaseHandler<electronAPI.IpcRequest, electronAPI.IpcResponse> {
  async handle(request: electronAPI.IpcRequest): Promise<electronAPI.IpcResponse> {
    if (request.type === 'get:authenticate') {
      const model = this.model;
      const pin = request.pin || null;
      const token = await new Authenticate({ model, pin }).execute();
      return {
        success: Boolean(token),
        strings: { token }
      };
    }

    return super.handle(request);
  }
}
