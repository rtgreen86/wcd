import { Handler } from './Handler';

export class UnsupportedHandler extends Handler<IpcRequest, IpcResponse> {
  handle(request: IpcRequest): Promise<void> {
    throw new Error(`Unsupported request type ${request.type}.`);
  }
}
