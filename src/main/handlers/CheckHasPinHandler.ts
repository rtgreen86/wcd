import PinGuard from '@main/services/PinGuard';
import IpcHandler from './IpcHandler';

type Request = electronAPI.IpcRequest;
type Response = electronAPI.IpcResponse;

export default class CheckHasPinHandler extends IpcHandler {
  override async execute(request: Request): Promise<Response> {
    if (request.endpoint !== 'get:check-has-pin') {
      return super.execute(request);
    }

    const hasPin = await PinGuard.getInstance().isSettedPin();

    return {
      success: true,
      payload: {
        flags: { hasPin }
      }
    };
  }
}
