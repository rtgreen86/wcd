export default abstract class Handler<Request, Response> {
  private next: Handler<Request, Response>;

  static CreateChain<Request, Response>(handlers: Handler<Request, Response>[]) {
    return handlers.reduce((a, b) => a.setNext(b));
  }

  execute(request: Request): Response {
    console.log('Process', this.constructor.name, request.endpoint);

    if (this.next) {
      console.log(1);
      return this.next.execute(request)
    }
    console.log(2);
    return this.handleEndOfChain(request);
  }

  setNext(handler: Handler<Request, Response>) {
    if (this.next) this.next.setNext(handler);
    else this.next = handler;
    return this;
  }

  protected abstract handleEndOfChain(request: Request): Response;
}
