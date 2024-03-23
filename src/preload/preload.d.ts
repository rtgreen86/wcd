declare namespace electronAPI.Types {
  interface File {
    name: string;
    content: string,
  }
}

declare namespace electronAPI.Types.Request {
  type Type = 'get:data' | 'put:data' | 'remove:data';
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
    Types.Request.Template<'remove:data', string>;

  type Response = Types.File | void;

  function sendRequest(request: Request<'get:data', string>): Promise<Types.File>;
  function sendRequest(request: Request<'put:data', Types.File>): Promise<void>;
  function sendRequest(request: Request<'remove:data', string>): Promise<void>;
  function sendRequest(request: Request): Promise<Response>;
}
