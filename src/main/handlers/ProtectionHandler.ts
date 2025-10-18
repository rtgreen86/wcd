import PinGuard from '@main/services/PinGuard';
import {generateToken} from '@main/services/tokens';
import Model from '@main/models/Model';
import IpcHandler from './IpcHandler';

type Request = electronAPI.IpcRequest;
type Response = electronAPI.IpcResponse;

export default class ProtectionHandler extends IpcHandler {
  private readonly model: Model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  async execte(request: Request): Promise<Response> {
    if (request.endpoint === 'get:check-has-pin') {
      return checkHasPin();
    }
    if (request.endpoint === 'get:token') {
      return this.getToken(request);
    }
    if (!this.checkToken(request)) {
      return {
        success: false,
        message: 'Invalid token.'
      };
    }
    if (request.endpoint === 'put:pin') {
      return setPin(request);
    }
    if (request.endpoint === 'put:remove-pin') {
      return removePin(request);
    }
    if (request.endpoint === 'put:reset-tokens') {
      return this.resetTokens();
    }
    return super.execute(request);
  }

  private async getToken(request: Request): Promise<Response> {
    const pin = request.payload?.strings?.pin || null;
    const isPinCorrect = await PinGuard.getInstance().verify(pin);

    if (!isPinCorrect) return {
      success: false,
      message: 'Incorrect PIN.',
    };

    const token = await generateToken();
    this.model.sessionTokens.add(token);

    return {
      success: true,
      payload: {
        strings: { token }
      }
    };
  }

  private checkToken(request: Request) {
    const token = request.token;
    return Boolean(token) && this.model.sessionTokens.has(token);
  }

  private resetTokens(): Response {
    this.model.sessionTokens.clear();
    return { success: true };
  }
}

async function checkHasPin(): Promise<Response> {
  const hasPin = await PinGuard.getInstance().isSettedPin();
  return {
    success: true,
    payload: {
      flags: { hasPin }
    }
  };
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
