import { BaseHandler } from '../../lib/chain-of-responsibility';
import { Storage } from '../models/storage';

export class GetDataController extends BaseHandler<electronAPI.Request, Promise<electronAPI.Responses.File>> {
  private readonly resource = 'get:data';

  async handle(request: electronAPI.Request) {
    if (request.resource === this.resource) {
      const filename = request.payload.filename;
      const content = await Storage.cipheredGet(filename);
      return { filename: filename, content };
    }
    return super.handle(request);
  }
}
