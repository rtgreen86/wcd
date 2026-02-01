import { Handler } from './Handler';

export class ChangePinHandler extends Handler<IpcRequest, IpcResponse> {
  handle(request: IpcRequest): Promise<void | IpcResponse> {
    if (request.type !== 'auth:change-pin') return this.next(request);

    return Promise.resolve({
      type: request.type,
      status: 'success',
      payload: undefined,
    } as IpcResponseFor<typeof request.type>);
  }
}
