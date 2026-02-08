import Model from '../models/Model';
import { Handler } from './Handler';
import FileSystem from '../services/FileSystem';

export class DataHandler extends Handler<IpcRequest, IpcResponse> {
  private readonly model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  handle(request: IpcRequest): Promise<void | IpcResponse> {
    switch (request.type) {
      case 'data:get':
        return this.getData(request);
      case 'data:put':
        return this.putData(request);
      case 'data:wipe':
        return this.wipeData(request);
      default:
        return this.next(request);
    }
  }

  private async getData(request: IpcRequestFor<'data:get'>): Promise<IpcResponseFor<'data:get'>> {
    const { key: storageKey } = request.payload;
    const { fsKey } = this.model;

    if (!storageKey) return {
      type: 'data:get',
      status: 'fail',
      payload: { message: 'Invalid key.' }
    };

    if (!fsKey) return {
      type: 'data:get',
      status: 'fail',
      payload: { message: 'No FS key.' }
    };

    const filename = `${storageKey}.enc`;

    try {
      const content = await FileSystem.getAppDataEncryptedFile(filename, fsKey);
      return {
        type: 'data:get',
        status: 'success',
        payload: { content }
      };
    } catch (error) {
      if (error.code === 'ENOENT') return {
        type: 'data:get',
        status: 'success',
        payload: { content: '' }
      };

      return {
        type: 'data:get',
        status: 'fail',
        payload: { error, message: 'data:get error.' }
      }
    }
  }

  private async putData(request: IpcRequestFor<'data:put'>): Promise<IpcResponseFor<'data:put'>> {
    const { key: storageKey, content } = request.payload;
    const { fsKey } = this.model;

    if (!storageKey) {
      return {
        type: 'data:put',
        status: 'fail',
        payload: { message: 'Invalid key.' },
      };
    }

    if (!fsKey) {
      return {
        type: 'data:put',
        status: 'fail',
        payload: { message: 'No FS key.' },
      };
    }

    const filename = `${storageKey}.enc`;

    try {
      await FileSystem.putAppDataEncryptedFile(filename, fsKey, content);
    } catch (error) {
      return {
        type: 'data:put',
        status: 'fail',
        payload: { error, message: 'data:put error.' }
      };
    }
  }

  private async wipeData(request: IpcRequestFor<'data:wipe'>): Promise<IpcResponseFor<'data:wipe'>> {
    const { key: storageKey } = request.payload;
    const { fsKey } = this.model;

    if (!storageKey) {
      return {
        type: 'data:wipe',
        status: 'fail',
        payload: { message: 'Invalid key.' }
      };
    }

    if (!fsKey) {
      return {
        type: 'data:wipe',
        status: 'fail',
        payload: { message: 'No FS key.' },
      };
    }

    const filename = `${storageKey}.enc`;

    try {
      await FileSystem.putAppDataEncryptedFile(filename, fsKey, '');
      return {
        type: 'data:wipe',
        status: 'success',
        payload: undefined,
      };
    } catch (error) {
      return {
        type: 'data:wipe',
        status: 'fail',
        payload: { error, message: 'data:wipe error.' }
      };
    }
  }
}
