interface IpcRequestMap {
  'auth:change-pin': { oldPin: string | null, newPin: string | null },
  'auth:sign-in': { pin: string | null },
  'auth:sign-out': void,
  'data:export': { token: string, content: data },
  'data:get': { token: string, key: string },
  'data:import': { token: string },
  'data:init': { token: string },
  'data:put': { token: string, key: string, content: data },
  'data:wipe': { token: string, key: string },
}

interface IpcResponseMap {
  'auth:change-pin': void,
  'auth:sign-in': { token: string },
  'auth:sign-out': void,
  'data:export': void,
  'data:get': { content: string },
  'data:import': { content: string },
  'data:init': void,
  'data:put': void,
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

  type IpcRequestFor<T extends IpcRequestType> = Extract<IpcRequest, { type: T }>;

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
