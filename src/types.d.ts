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
  function sendRequest(request: WCD.Requests.GetData): Promise<WCD.File>;
  function sendRequest(request: WCD.Requests.PutData): Promise<void>;
  function sendRequest(request: WCD.Requests.RemoveData): Promise<void>;
  function sendRequest(request: WCD.Requests.IsPinExists): Promise<boolean>;
  function sendRequest(request: WCD.Requests.SetPin): Promise<boolean>;
  function sendRequest(request: WCD.Requests.RemovePin): Promise<boolean>;
  function sendRequest(request: WCD.Requests.GetToken): Promise<string>;
}
