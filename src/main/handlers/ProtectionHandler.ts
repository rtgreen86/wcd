import PinGuard from '@main/services/PinGuard';
import {generateToken} from '@main/services/tokens';
import {getKey} from '@main/services/fileSystemKey';
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
    if (request.endpoint === 'get:token') {
      return this.getToken(request);
    }

    if (!this.checkToken(request)) {
      return {
        success: false,
        message: 'Invalid token.'
      };
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

    this.loadFsKey();
    const token = await this.generateToken();

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
    this.model.fsKey = null;
    this.model.data = null;
    return { success: true };
  }

  private async loadFsKey() {
    this.model.fsKey = await getKey();
  }

  private async generateToken() {
    const token = await generateToken();
    this.model.sessionTokens.add(token);
    return token;
  }
}
