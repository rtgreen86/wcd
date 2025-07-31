declare namespace electronAPI {
  type AuthenticateRequest = {
    type: 'get:authenticate',
    pin: string | null
  };

  type PutPinRequest = {
    type: 'put:pin',
    token?: string,
    currentPin: string | null,
    newPin: string | null
  };

  type DeletePinRequest = {
    type: 'delete:pin',
    token?: string,
    pin: string | null,
  };

  type GetPinExistsRequest = {
    type: 'get:pin-exists',
  };

  type GetDataRequest = {
    type: 'get:data',
    token?: string,
  };

  type PutDataRequest = {
    type: 'put:data',
    token?: string,
    data: string,
  };

  export type IpcRequest = AuthenticateRequest
    | PutPinRequest
    | DeletePinRequest
    | GetPinExistsRequest
    | GetDataRequest
    | PutDataRequest
}

declare namespace electronAPI {
  export type IpcResponse = {
    success: boolean,
    strings?: Record<string, string>,
    numbers?: Record<string, number>,
    flags?: Record<string, boolean>,
    data?: Record<string, unknown>
  }
}

declare namespace electronAPI {
  function ipcRequest(request: IpcRequest): Promise<IpcResponse>;
}
