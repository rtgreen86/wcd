import PinGuard from '@main/services/PinGuard';
import BaseHandler from './BaseHandler';

export default class PinHandler extends BaseHandler<electronAPI.IpcRequest, electronAPI.IpcResponse> {
  async handle(request: electronAPI.IpcRequest): Promise<electronAPI.IpcResponse> {
    if (request.type === 'put:pin') {
      const currentPin = request.currentPin || null;
      const newPin = request.newPin || null;
      const success = await PinGuard.getInstance().setPin(currentPin, newPin);
      return { success };
    }

    if (request.type === 'delete:pin') {
      const pin = request.pin || null;
      const success = await PinGuard.getInstance().removePin(pin)
      return { success };
    }

    return super.handle(request);
  }
}
