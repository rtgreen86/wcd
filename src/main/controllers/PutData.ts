import { Handler } from '../../lib/chain-of-responsibility';
import { Storage } from '../models/storage';

export default class PutData implements Handler<electronAPI.Request, Promise<electronAPI.Response>> {
  async handle(request: electronAPI.Request, next: () => Promise<electronAPI.Response>): Promise<electronAPI.Response> {
    if (request.type !== 'put:data') {
      return next();
    }

    const name = request.payload.name;
    const content = request.payload.content;

    await Storage.cipheredPut(name, content);
  }
}
