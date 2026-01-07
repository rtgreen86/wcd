import IpcHandler from './IpcHandler';
import Model from '../models/Model';
import DataStorage from '../services/DataStorage';
import {initializeFSKey} from '../services/fileSystemKey';
import { BackwardFacade } from '../services/backward-converters';

type Request = electronAPI.IpcRequest;
type Response = electronAPI.IpcResponse;

export default class InitHandler extends IpcHandler {
  private readonly model: Model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  override async execute(): Promise<Response> {
    await initializeFSKey();

    try {
      await BackwardFacade.processAll();
    } catch (error) {
      return this.handleError(error);
    }

    return { success: true };
  }

  private handleError(error: unknown): Response {
    if (typeof error === 'string') return {
        success: false,
        message: error
    }; else if (error instanceof Error) return {
        success: false,
        message: error.message
    };
    return {
      success: false,
      message: `Unexpected error.`
    };
  }
}
