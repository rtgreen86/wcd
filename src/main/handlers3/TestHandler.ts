import { Handler } from './Handler';

export class TestHandler extends Handler<IpcRequest, IpcResponse> {
  handle(request: IpcRequest) {
    if (request.type !== 'test') return this.next(request);

    return Promise.resolve({
      type: 'test',
      status: 'success',
      payload: { content: `Response for ${request.payload.content}` },
    } as IpcResponseFor<typeof request.type>);
  }
}
