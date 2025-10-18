import Handler from './Handler';

type Request = electronAPI.IpcRequest;
type Response = electronAPI.IpcResponse;

export default class IpcHandler extends Handler<Request, Promise<Response>> {
  protected handleEndOfChain(request: Request): Promise<Response> {
    return Promise.resolve({
      success: false,
      message: 'No handler',
      payload: {
        strings: { endpoint: request.endpoint },
      }
    });
  }
}
