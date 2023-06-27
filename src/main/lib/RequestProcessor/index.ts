const noop = () => undefined as void;

export type Handler<Request, Response> = (
  request: Request,
  next: (request: Request) => void
) => Response | undefined;

export function createRequestProcessor<Request, Response>() {
  const handlers: Array<Handler<Request, Response>> = [];

  return {
    use: (handler: Handler<Request, Response>) => handlers.push(handler),

    handle: (request: Request) => handlers.reduceRight<(request: Request) => void>(
      (f1, f2) => (request: Request) => f2(request, f1),
      noop
    )(request),
  }
}
