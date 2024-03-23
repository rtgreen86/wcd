import { Handler, ChainOfResponsibility } from './index';
import { jest } from '@jest/globals';

describe('ChainOfResponsibility', () => {
  it('should execute all handlers', () => {
    const handler1 = {handle: jest.fn((request: unknown, next: () => void) => next())};
    const handler2 = {handle: jest.fn((request: unknown, next: () => void) => next())};
    const chain = new ChainOfResponsibility([handler1, handler2])
    expect(chain.handle('request')).toBe(null);
    expect(handler1.handle).toHaveBeenCalledWith('request', expect.any(Function));
    expect(handler2.handle).toHaveBeenCalledWith('request', expect.any(Function));
  });

  it('should break chain and return response', () => {
    const handler1 = {handle: jest.fn((request: unknown, next: () => void) => 'response')};
    const handler2 = {handle: jest.fn((request: unknown, next: () => void) => 'response 2')};
    const chain = new ChainOfResponsibility([handler1, handler2])
    expect(chain.handle('request')).toBe('response');
    expect(handler1.handle).toHaveBeenCalledWith('request', expect.any(Function));
    expect(handler2.handle).not.toHaveBeenCalled();
  });

  it('should throw if handler throw', () => {
    const handler = {handle: jest.fn((request: unknown, next: () => void) => { throw new Error('Test Error'); })};
    const chain = new ChainOfResponsibility([handler]);
    expect(() => chain.handle('request')).toThrow('Test Error');
  });
});
