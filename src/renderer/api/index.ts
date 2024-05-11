import * as Marks from './marks'

export default class Api {
  static getMarks() {
    return Marks.getMarks();
  }

  static putMarks(marks: string[]) {
    return Marks.putMarks(marks);
  }

  static getToken(pin: string) {
    return Promise.resolve('token');
  }
}

export * from './marks';

export async function isPinExist() {
  return electronAPI.sendRequest({ type: 'get:isPinExist' }) as any as Promise<boolean>;
}
