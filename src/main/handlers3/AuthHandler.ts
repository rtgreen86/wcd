import { Handler } from './Handler';

export class AuthHandler extends Handler<IpcRequest, IpcResponse> {
  handle(request: IpcRequest): Promise<void> | Promise<IpcResponse> {
    switch (request.type) {
      case 'auth:sign-in':
        return this.signIn();
      case 'auth:sign-out':
        return this.signOut();
      default:
        return this.next(request);
    }
  }

  private signIn(/*pin: string*/) {
    return Promise.resolve({
      type: 'auth:sign-in',
      status: 'success',
      payload: { token: 'token' },
    } as IpcResponseFor<'auth:sign-in'>);
  }

  private signOut() {
    return Promise.resolve({
      type: 'auth:sign-out',
      status: 'success',
    } as IpcResponseFor<'auth:sign-out'>);
  }
}
