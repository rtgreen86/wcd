import { BaseHandler } from '../../lib/chain-of-responsibility';
import { Storage } from '../models';

export default class PutDataController extends BaseHandler<WCD.Request, Promise<WCD.Response>> {
  async handle(request: WCD.Request): Promise<WCD.Response> {
    if (request.type !== 'put:data') {
      return super.handle(request);
    }

    const filename = request.payload.name;
    const content = request.payload.content || '';
    await Storage.encryptPut(filename, content);
  }
}
