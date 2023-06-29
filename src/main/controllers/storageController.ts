import {Handler} from '../lib/RequestProcessor';
import {get, put} from '../Storage'

export function createStorageController<REQUEST extends {uri: string, method: string, body: string}, RESPONSE>() {
  return (async (request, next) => {
    switch (request.method) {
      case 'PUT': return put(request.uri, request.body);
      case 'GET': return { body: await get(request.uri) };
    }
    return Promise.resolve(next(request));
  }) as Handler<REQUEST, RESPONSE>;
}
