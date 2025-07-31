import PinGuard from '@main/services/PinGuard';
import BaseHandler from './BaseHandler';

export default class PinExistsHandler extends BaseHandler<electronAPI.IpcRequest, electronAPI.IpcResponse> {
  async handle(request: electronAPI.IpcRequest): Promise<electronAPI.IpcResponse> {
    if (request.type === 'get:pin-exists') {
      const pinExists = await PinGuard.getInstance().isSettedPin();
      return {
        success: true,
        flags: { pinExists }
      };
    }

    return super.handle(request);
  }
}
