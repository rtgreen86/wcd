import { Handler } from './Handler';

export class ExportHandler extends Handler<IpcRequest, IpcResponse> {
  handle(request: IpcRequest): Promise<void | IpcResponse> {
    switch(request.type) {
      case 'data:export':
        return this.export();
      case 'data:import':
        return this.import();
      default:
        return this.next(request);
    }
  }

  private export() {
    return Promise.resolve({
      type: 'data:export',
      status: 'success',
      payload: undefined,
    } as IpcResponseFor<'data:export'>);
  }

  private import() {
    return Promise.resolve({
      type: 'data:import',
      status: 'success',
      payload: { content: '{}' },
    } as IpcResponseFor<'data:import'>);
  }
}
