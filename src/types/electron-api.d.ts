declare namespace WCD {
  type ExportRequest = {
    type: 'export',
  }

  type ImportRequest = {
    type: 'import',
  }

  type WipeRequest = {
    type: 'wipe',
  }

  export type Request = ExportRequest | ImportRequest | WipeRequest;

  export type ActionType = Request['type'];
}

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
  function init(): Promise<IpcResponse>;
  function ipcRequest(request: IpcRequest): Promise<IpcResponse>;
}


