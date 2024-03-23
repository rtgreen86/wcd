import { Handler } from '../../lib/chain-of-responsibility';
import { Storage } from '../models/storage';

export default class GetData implements Handler<electronAPI.Request, Promise<electronAPI.Response>> {
  async handle(request: electronAPI.Request, next: () => Promise<electronAPI.Response>): Promise<electronAPI.Response> {
    if (request.type !== 'get:data') {
      return next();
    }

    const name = request.payload;
    const content = await Storage.cipheredGet(name);
    return { name, content };
  }
}
