export default abstract class Handler<Request, Response> {
  private next: Handler<Request, Response>;

  static CreateChain<Request, Response>(handlers: Handler<Request, Response>[]) {
    return handlers.reduce((a, b) => a.setNext(b));
  }

  execute(request: Request): Response {
    if (this.next) {
      return this.next.execute(request)
    }
    return this.handleEndOfChain(request);
  }

  setNext(handler: Handler<Request, Response>) {
    if (this.next) this.next.setNext(handler);
    else this.next = handler;
    return this;
  }

  protected abstract handleEndOfChain(request: Request): Response;
}
