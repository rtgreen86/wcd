declare namespace electronAPI.Responses {
  interface File {
    filename: string;
    content: string;
  }
}

declare namespace electronAPI.Payloads {
  interface Filename {
    filename: string;
  }

  interface File extends Filename {
    content: string;
  }

  interface PinCode {
    pin: string,
  }

  interface ChangePinCode {
    pin: string,
    newPin: string,
  }
}

declare namespace electronAPI {
  type Resource = 'get:data' | 'put:data' | 'remove:data' | 'get:isPinExists' | 'set:pin' | 'get:token';

  type Payload = Payloads.Filename | Payloads.File | Payloads.PinCode | Payloads.ChangePinCode;

  type Response = Responses.File | boolean | string | null | void;

  interface RequestTemplate<R extends Resource, P extends Payload> {
    resource: R;
    payload: P;
  }

  type Request =
    RequestTemplate<'get:data', Payloads.Filename> |
    RequestTemplate<'put:data', Payloads.File> |
    RequestTemplate<'get:isPinExists', void> |
    RequestTemplate<'set:pin', Payloads.ChangePinCode> |
    RequestTemplate<'get:token', Payloads.PinCode>;

  function sendRequest(request: RequestTemplate<'get:data', Payloads.Filename>): Promise<Responses.File>;
  function sendRequest(request: RequestTemplate<'put:data', Payloads.File>): Promise<void>;
  function sendRequest(request: RequestTemplate<'get:isPinExists', void>): Promise<boolean>;
  function sendRequest(request: RequestTemplate<'set:pin', Payloads.ChangePinCode>): Promise<boolean>;
  function sendRequest(request: RequestTemplate<'get:token', Payloads.PinCode>): Promise<string | null>;
}
