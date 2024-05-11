declare namespace electronAPI.Types {
  interface File {
    name: string;
    content: string,
  }

  interface Pin {
    pin: string | null,
    newPin?: string | null
  }
}

declare namespace electronAPI.Types.Request {
  type Type = 'get:data' | 'put:data' | 'remove:data' | 'get:isPinExist' | 'set:pin' | 'get:token';
  interface Token {
    token?: string,
  }

  interface Payload<Type> {
    payload: Type
  }

  interface Template<Type extends RequestType, PayloadType = Record<string, unknown>> extends Token, Payload<PayloadType> {
    type: Type,
  }
}

declare namespace electronAPI {
  type Request =
    Types.Request.Template<'get:data', string> |
    Types.Request.Template<'put:data', Types.File> |
    Types.Request.Template<'remove:data', string> |
    Types.Request.Template<'get:isPinExist', void> |
    Types.Request.Template<'set:pin' | 'get:token', Types.SetPin>;

  type Response = Types.File | boolean | string | void;

  function sendRequest(request: Request<'get:data', string>): Promise<Types.File>;
  function sendRequest(request: Request<'put:data', Types.File>): Promise<void>;
  function sendRequest(request: Request<'remove:data', string>): Promise<void>;
  function sendRequest(request: Request<'get:isPinExist', void>): Promise<boolean>;
  function sendRequest(request: Request<'set:pin' | 'get:token', Types.SetPin>): Promise<string>;
  function sendRequest(request: Request): Promise<Response>;
}
