import PinGuard from '@main/services/PinGuard';
import IpcHandler from './IpcHandler';

type Request = electronAPI.IpcRequest;
type Response = electronAPI.IpcResponse;

export default class CheckHasPinHandler extends IpcHandler {
  override async execute(request: Request): Promise<Response> {
    console.log(JSON.stringify(request));

    if (request.endpoint !== 'get:check-has-pin') {
      console.log(1);
      return super.execute(request);
    }

    console.log(2);
    const hasPin = await PinGuard.getInstance().isSettedPin();

    return {
      success: true,
      payload: {
        flags: { hasPin }
      }
    };
  }
}
