import { BaseHandler, ChainOfResponsibility } from './index';
import { jest } from '@jest/globals';

type Request = {
  type: string,
};

type SyncResponse = string;

type AsyncResponse = Promise<string>;

class SyncHandler extends BaseHandler<Request, SyncResponse> {
  private type: string;

  constructor(type: string) {
    super();
    this.type = type;
  }

  handle(request: Request) {
    if (request.type === this.type) return this.type;
    return super.handle(request);
  }
}

function syncFunctionHandler(type: string) {
  return (request: Request, next: (request: Request) => SyncResponse) => {
    if (request.type === type) return type;
    return next(request);
  };
}

class AsyncHandler extends BaseHandler<Request, AsyncResponse> {
  private type: string;

  constructor(type: string) {
    super();
    this.type = type;
  }

  async handle(request: Request) {
    const result = await Promise.resolve(this.type === request.type);
    if (result) return this.type;
    return super.handle(request);
  }
}

function asyncFunctionHandler(type: string) {
  return async (request: Request, next: (request: Request) => AsyncResponse) => {
    const result = await Promise.resolve(request.type === type);
    if (result) return type;
    return next(request);
  }
}

describe('ChainOfResponsibility', () => {
  describe('synchronously', () => {
    it.each([
      ['first', 'first'],
      ['second', 'second'],
      ['third', 'third'],
      ['fourth', null],
    ])('should get result from %s', async (type, expected) => {
      expect(new ChainOfResponsibility([
        new SyncHandler('first'),
        syncFunctionHandler('second'),
        new SyncHandler('third'),
      ]).handle({ type })).toEqual(expected);
    });
  });

  describe('asynchronously', () => {
    it.each([
      ['first', 'first'],
      ['second', 'second'],
      ['third', 'third'],
      ['fourth', null],
    ])('should get result from %s', async (type, expected) => {
      await expect(new ChainOfResponsibility([
        new AsyncHandler('first'),
        asyncFunctionHandler('second'),
        new AsyncHandler('third'),
      ]).handle({ type })).resolves.toEqual(expected);
    });
  });
});
