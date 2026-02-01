import { Handler } from './Handler';

export class InitHandler extends Handler<IpcRequest, IpcResponse> {
  handle(request: IpcRequest): Promise<void> | Promise<IpcResponse> {
    if (request.type !== 'data:init') return this.next(request);

    return Promise.resolve({
      type: request.type,
      status: 'success',
      payload: undefined,
    } as IpcResponseFor<typeof request.type>);
  }
}
