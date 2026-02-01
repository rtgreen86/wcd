import { Handler } from './Handler';

export class ProtectionHandler extends Handler<IpcRequest, IpcResponse> {
  handle(request: IpcRequest): Promise<void | IpcResponse> {
    const token = request.payload && 'token' in request.payload
      ? request.payload.token
      : null;

    const isCorrect = token !== null && token !== '';

    if (isCorrect) return this.next(request);

    return Promise.resolve({
      type: request.type,
      status: 'fail',
      payload: { message: 'Unauthorized' },
    } as IpcResponse)
  }
}
