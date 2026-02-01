import { Handler } from './Handler';

export class DataHandler extends Handler<IpcRequest, IpcResponse> {
  handle(request: IpcRequest): Promise<void> | Promise<IpcResponse> {
    switch(request.type) {
      case 'data:load':
        return this.load();
      case 'data:save':
        return this.save();
      default:
        return this.next(request);
    }
  }

  private load() {
    return Promise.resolve({
      type: 'data:load',
      status: 'success',
      payload: { content: '{}' },
    } as IpcResponseFor<'data:load'>);
  }

  private save() {
    return Promise.resolve({
      type: 'data:save',
      status: 'success',
      payload: undefined,
    } as IpcResponseFor<'data:save'>);
  }
}
