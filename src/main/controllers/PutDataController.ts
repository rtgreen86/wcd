import { BaseHandler } from '../../lib/chain-of-responsibility';
import DataStorage from '@main/facades/DataStorage';

export default class PutDataController extends BaseHandler<WCD.Request, Promise<WCD.Response>> {
  async handle(request: WCD.Request): Promise<WCD.Response> {
    if (request.type !== 'put:data') {
      return super.handle(request);
    }
    const content = request.payload.content || '';
    await DataStorage.put(content);
  }
}
