const noop = () => undefined as void;

export type Handler<Request, Response> = (
  request: Request,
  response: (response: Response) => void,
  next: (request: Request) => void
) => void;

export function createRequestProcessor<Request, Response>() {
  const handlers: Array<Handler<Request, Response>> = [];

  return {
    use: (handler: Handler<Request, Response>) => handlers.push(handler),

    handle: (request: Request, response: (response: Response) => void) => handlers.reduceRight<(request: Request) => void>(
      (f1, f2) => (request: Request) => f2(request, response, f1),
      noop
    )(request),
  }
}
