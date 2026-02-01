import Model from '../models/Model';
import { Handler } from './Handler';
import { initializeFSKey } from '../services/fileSystemKey';
import { BackwardFacade } from '../services/backward-converters';

export class InitHandler extends Handler<IpcRequest, IpcResponse> {
  private readonly model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  async handle(request: IpcRequest) {
    if (request.type !== 'data:init') return this.next(request);

    await initializeFSKey();

    try {
      await BackwardFacade.processAll();
    } catch (error) {
      if (typeof error === 'string') return {
        type: request.type,
        status: 'fail',
        payload: { message: error }
      } as IpcResponse;

      if (error instanceof Error) return {
        type: request.type,
        status: 'fail',
        payload: {
          message: error.message,
          error,
        },
      } as IpcResponse;

      return {
        type: request.type,
        status: 'fail',
        payload: {
          message: String(error),
          error: new Error(String(error))
        }
      } as IpcResponse;
    }

    return {
      type: request.type,
      status: 'success',
      payload: undefined,
    } as IpcResponseFor<typeof request.type>;
  }
}
