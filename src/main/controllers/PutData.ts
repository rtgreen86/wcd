import { Handler } from '../../lib/chain-of-responsibility';
import { Storage } from '../models/storage';

export default class PutData implements Handler<electronAPI.Request, Promise<electronAPI.Response>> {
  async handle(request: electronAPI.Request, next: () => Promise<electronAPI.Response>): Promise<electronAPI.Response> {
    if (request.resource !== 'put:data') {
      return next();
    }
    if (!request.payload || request.payload.type !== 'data') {
      return next();
    }

    const name = request.payload.filename;
    const content = request.payload.content || '';

    await Storage.cipheredPut(name, content);
  }
}
