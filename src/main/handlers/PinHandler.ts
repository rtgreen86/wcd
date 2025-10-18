import PinGuard from '@main/services/PinGuard';
import IpcHandler from './IpcHandler';

type Request = electronAPI.IpcRequest;
type Response = electronAPI.IpcResponse;

export default class PinHandler extends IpcHandler {
  async execte(request: Request): Promise<Response> {
    if (request.endpoint === 'put:pin') {
      return setPin(request);
    }

    if (request.endpoint === 'put:remove-pin') {
      return removePin(request);
    }

    return super.execute(request);
  }
}

async function setPin(request: Request): Promise<Response> {
  const pin = request.payload?.strings?.pin || null;
  const newPin = request.payload?.strings?.newPin || null;

  if (!newPin) return {
    success: false,
    message: 'New PIN is not set.'
  };

  const success = await PinGuard.getInstance().setPin(pin, newPin);

  if (!success) return {
    success: false,
    message: 'Incorrect PIN.'
  }

  return { success };
}

async function removePin(request: Request): Promise<Response> {
  const pin = request.payload?.strings?.pin || null;

  const success = await PinGuard.getInstance().removePin(pin);

  if (!success) return {
    success: false,
    message: 'Incorrect PIN.',
  }

  return { success };
}
