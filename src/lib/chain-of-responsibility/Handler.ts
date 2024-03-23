export interface Handler<Request, Response> {
  handle(request: Request, next: () => Response): Response | null;
}
