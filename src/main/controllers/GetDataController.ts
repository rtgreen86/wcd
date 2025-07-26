import { BaseHandler } from '../../lib/chain-of-responsibility';
import DataStorage from '@main/facades/DataStorage';

export default class GetDataController extends BaseHandler<WCD.Request, Promise<WCD.Response>> {
  async handle(request: WCD.Request): Promise<WCD.Response> {
    if (request.type !== 'get:data') {
      return super.handle(request);
    }
    const name = request.payload;
    const content = await DataStorage.get();
    return { name, content };
  }
}
