interface IpcRequestMap {
  'auth:get-token': { pin: string | null },
  'auth:dispose-token': { token: string },
  'auth:change-pin': { oldPin: string | null, newPin: string | null },
  'data:init': void,
  'data:get': { token: string },
  'data:put': { token: string, content: string },
  'data:export': { token: string, content: string },
  'data:import': { token: string },
  'data:wipe': { token: string, pin: string | null }
}

interface IpcResponseMap {
  'auth:get-token': { token: string },
  'auth:dispose-token': void,
  'auth:change-pin': void,
  'data:init': void,
  'data:get': { content: string },
  'data:put': void,
  'data:export': void,
  'data:import': { content: string },
  'data:wipe': void
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
    dispatch<T extends IpcRequestType>(request: IpcRequestFor<T>): Promise<IpcResponseFor<T>>;
  }

  var electronAPI3: ElectronAPI3;

  interface Window {
    electronAPI3: ElectronAPI3;
  }
}

export { };
