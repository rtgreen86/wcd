interface IpcRequestMap {
  'test': { content: string, token: string },
  'data:init': { token: string },
  'data:load': { token: string },
  'data:save': { token: string, content: data },
  'data:import': { token: string },
  'data:export': { token: string, content: data },
  'auth:get-token': { pin: string | null },
  'auth:change-pin': { oldPin: string | null, newPin: string | null },
}

interface IpcResponseMap {
  'test': { content: string },
  'data:init': void,
  'data:load': { content: string },
  'data:save': void,
  'data:import': { content: string },
  'data:export': void,
  'auth:get-token': { token: string },
  'auth:change-pin': void,
}

declare global {
  type IpcRequestType = keyof IpcRequestMap;

  type IpcRequest = {
    [K in IpcRequestType]: { type: K; payload: IpcRequestMap[K] }
  }[IpcRequestType];

  type IpcResponse = {
    [K in IpcRequestType]: { type: K, status: 'success', payload: IpcResponseMap[K] }
    | { type: K, status: 'fail', payload: string, error?: Error }
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
