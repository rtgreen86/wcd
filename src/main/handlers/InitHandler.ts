import { Handler } from '@shared/infra/Handler';
import i18n from '@shared/translations';
import Model from '../models/Model';
import InitCommand from '../commands/InitEncryptionCommand';

import { BackwardFacade } from '../services/backward-converters';

export class InitHandler extends Handler<IpcRequest, IpcResponse> {
  private readonly model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  async handle(request: IpcRequest): Promise<IpcResponse> {
    if (request.type !== 'app:init') return this.next(request);

    await i18n.changeLanguage(request.payload.locale);
    await new InitCommand(this.model).execute();


    // await initializeFSKey();

    // try {
    //   await BackwardFacade.processAll();
    // } catch (error) {
    //   if (typeof error === 'string') return {
    //     type: request.type,
    //     status: 'fail',
    //     payload: { message: error }
    //   } as IpcResponse;

    //   if (error instanceof Error) return {
    //     type: request.type,
    //     status: 'fail',
    //     payload: {
    //       message: error.message,
    //       error,
    //     },
    //   } as IpcResponse;

    //   return {
    //     type: request.type,
    //     status: 'fail',
    //     payload: {
    //       message: String(error),
    //       error: new Error(String(error))
    //     }
    //   } as IpcResponse;
    // }

    return {
      type: 'app:init',
      status: 'fail',
      payload: { message: 'not initialized.' + JSON.stringify(this.model), }
    };
  }
}
