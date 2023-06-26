export function createRequestProcessor<REQUEST, RESPONSE>() {
  type Handler = (request: REQUEST, next: Handler) => RESPONSE | Promise<RESPONSE> | null;

  const handlers: Handler[] = [];

  const reducer = (f1: Handler, f2: Handler) => (request: REQUEST) => f2(request, f1);

  return {
    use: (handler: Handler) => handlers.push(handler),
    handle: (request: REQUEST) => handlers.reduce<(request: REQUEST) => ReturnType<Handler>>(reducer, () => null)(request),
  }
}
