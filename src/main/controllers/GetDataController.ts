import { BaseHandler } from '../../lib/chain-of-responsibility';
import { Storage } from '../models';

export default class GetDataController extends BaseHandler<WCD.Request, Promise<WCD.Response>> {
  async handle(request: WCD.Request): Promise<WCD.Response> {
    if (request.type !== 'get:data') {
      return super.handle(request);
    }
    const name = request.payload;
    const content = await Storage.encryptGetSafe(name);
    return { name, content };
  }
}
