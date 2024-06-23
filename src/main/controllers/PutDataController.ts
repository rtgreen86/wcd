import { BaseHandler } from '../../lib/chain-of-responsibility';
import { Storage } from '../models/storage';

export default class PutDataController extends BaseHandler<electronAPI.Request, Promise<electronAPI.Response>> {
  private readonly resource = 'put:data';

  async handle(request: electronAPI.Request) {
    if (request.resource === this.resource) {
      const name = request.payload.filename;
      const content = request.payload.content || '';
      await Storage.cipheredPut(name, content);
      return;
    }
    return super.handle(request);
  }
}
