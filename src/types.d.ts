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
  export enum RequestType {
    PIN_IS_EXISTS = 'get:pin-is-exists',
    PIN_SET = 'set:pin',
    PIN_REMOVE = 'remove:pin',
    AUTHENTICATE = 'get:authenticate',
    DATA_GET = 'get:data',
    DATA_PUT = 'put:data'
  }


type AuthenticateRequest = {
  type: RequestType.AUTHENTICATE,
  payload: {
    token?: string,
    pin: string | null
  }
};

type PinIsExistsRequest = {
  type: RequestType.PIN_IS_EXISTS
};

type PinSetRequest = {
  type: RequestType.PIN_SET,
  payload: {
    token?: string,
    pin: string,
    newPin: string
  }
};

type PinRemoveRequest = {
  type: RequestType.PIN_REMOVE,
  payload: {
    token?: string,
    pin: string
  }
};


type DataGetRequest = {
  type: RequestType.DATA_GET,
  payload: {
    token?: string
  }
};

type DataPutRequest = {
  type: RequestType.DATA_PUT,
  payload: {
    token?: string,
    data: string
  }
};

export type IPCRequest = AuthenticateRequest
  | PinIsExistsRequest
  | PinSetRequest
  | PinRemoveRequest
  | DataGetRequest
  | DataPutRequest;
}

declare namespace electronAPI {
type AuthenticateResponse = {
  type: RequestType.AUTHENTICATE,
  payload: {
    token?: string | null,
  }
};

type PinIsExistsResponse = {
  type: RequestType.PIN_IS_EXISTS,
  payload: {
    isExists: boolean,
  }
};

type PinSetResponse = {
  type: RequestType.PIN_SET,
  payload: {
    success: boolean,
  }
};

type PinRemoveResponse = {
  type: RequestType.PIN_REMOVE,
  payload: {
    success: boolean,
  }
};

type DataGetResponse = {
  type: RequestType.DATA_GET,
  payload: {
    data: string,
  }
};

type DataPutResponse = {
  type: RequestType.DATA_PUT
};

export type IPCResponse = AuthenticateResponse
  | PinIsExistsResponse
  | PinSetResponse
  | PinRemoveResponse
  | DataGetResponse
  | DataPutResponse;
}

declare namespace electronAPI {
  function sendRequest(request: WCD.Requests.GetData): Promise<WCD.File>;
  function sendRequest(request: WCD.Requests.PutData): Promise<void>;
  function sendRequest(request: WCD.Requests.RemoveData): Promise<void>;
  function sendRequest(request: WCD.Requests.IsPinExists): Promise<boolean>;
  function sendRequest(request: WCD.Requests.SetPin): Promise<boolean>;
  function sendRequest(request: WCD.Requests.RemovePin): Promise<boolean>;
  function sendRequest(request: WCD.Requests.GetToken): Promise<string>;
  function ipcRequest(request: IPCRequest): Promise<IPCResponse>;
}
