import { BaseHandler } from "../../lib/chain-of-responsibility";

export default class RemoveDataController extends BaseHandler<WCD.Request, Promise<WCD.Response>> {
  async handle(request: WCD.Request) {
    return super.handle(request);
  }
}
