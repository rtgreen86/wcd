export function isMock<Type extends (...args: Array<unknown>) => unknown>(method: Type): method is jest.MockedFunction<Type> {
  return 'mock' in method;
}
