declare namespace electronAPI {
  export type IpcPayload = {
    strings?: Record<string, string>,
    numbers?: Record<string, number>,
    flags?: Record<string, boolean>,
    data?: Record<string, unknown>
  }

  export type IpcRequest = {
    endpoint: string,
    token?: string,
    payload?: IpcPayload,
  };

  export type IpcResponse = {
    success: boolean,
    message?: string,
    payload?: IpcPayload,
  }
}

declare namespace electronAPI {
  function init(): Promise<void>;
  function ipcRequest(request: IpcRequest): Promise<IpcResponse>;
}
