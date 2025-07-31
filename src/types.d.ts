declare namespace WCD {
  interface File {
    name: string,
    content?: string,
  };
}

declare namespace WCD.Requests {
  type GetData = {
    type: 'get:data',
    payload: string
  };

  type PutData = {
    type: 'put:data',
    payload: File,
  };

  type RemoveData = {
    type: 'remove:data',
    payload: string,
  };

  type IsPinExists = {
    type: 'get:isPinExists',
    payload: void,
  };

  type SetPin = {
    type: 'set:pin',
    payload: {
      pin: string,
      newPin: string,
    },
  };

  type GetToken = {
    type: 'get:token',
    payload: {
      pin: string,
    },
  };

  type RemovePin = {
    type: 'remove:pin',
    payload: {
      pin: string,
    },
  };
}

declare namespace WCD {
  export type Request = Requests.GetData | Requests.PutData | Requests.RemoveData | Requests.IsPinExists |
    Requests.GetToken | Requests.SetPin | Requests.RemovePin;

  export type Response = File | boolean | string | void;
}

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
  function sendRequest(request: WCD.Requests.GetData): Promise<WCD.File>;
  function sendRequest(request: WCD.Requests.PutData): Promise<void>;
  function sendRequest(request: WCD.Requests.RemoveData): Promise<void>;
  function sendRequest(request: WCD.Requests.IsPinExists): Promise<boolean>;
  function sendRequest(request: WCD.Requests.SetPin): Promise<boolean>;
  function sendRequest(request: WCD.Requests.RemovePin): Promise<boolean>;
  function sendRequest(request: WCD.Requests.GetToken): Promise<string>;
  function ipcRequest(request: IpcRequest): Promise<IpcResponse>;
}
