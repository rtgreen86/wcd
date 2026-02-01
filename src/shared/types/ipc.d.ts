interface IpcRequestMap {
  'auth:change-pin': { oldPin: string | null, newPin: string | null },
  'auth:sign-in': { pin: string | null },
  'auth:sign-out': void,
  'data:export': { token: string, content: data },
  'data:import': { token: string },
  'data:init': { token: string },
  'data:load': { token: string },
  'data:save': { token: string, content: data },
  'data:wipe': { token: string },
}

interface IpcResponseMap {
  'auth:change-pin': void,
  'auth:sign-in': { token: string },
  'auth:sign-out': void,
  'data:export': void,
  'data:import': { content: string },
  'data:init': void,
  'data:load': { content: string },
  'data:save': void,
  'data:wipe': void,
}

declare global {
  type IpcRequestType = keyof IpcRequestMap;

  type IpcRequest = {
    [K in IpcRequestType]: { type: K; payload: IpcRequestMap[K] }
  }[IpcRequestType];

  type IpcResponse = {
    [K in IpcRequestType]: { type: K, status: 'success', payload: IpcResponseMap[K] }
    | { type: K, status: 'fail', payload: { message: string, error?: Error } }
  }[IpcRequestType];

  type IpcResponseFor<T extends IpcRequestType> = Extract<IpcResponse, { type: T }>;

  interface ElectronAPI3 {
    dispatch<T extends IpcRequestType>(request: { type: T, payload: IpcRequestMap[T] }): Promise<IpcResponseFor<T>>;
  }

  var electronAPI3: ElectronAPI3;

  interface Window {
    electronAPI3: ElectronAPI3;
  }
}

export { };
