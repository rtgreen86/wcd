declare namespace electronAPI.Entities {
  interface File {
    filename: string;
    content?: string;
  }
}

declare namespace electronAPI.Payloads {
  interface PinCode {
    type: 'pin';
    pin: string;
  }

  interface SetPinCode {
    type: 'set-pin';
    pin: string;
    newPin: string;
  }

  interface File extends Entities.File {
    type: 'file';
  }
}

declare namespace electronAPI {
  type Payload = Payloads.PinCode | Payloads.SetPinCode | Payloads.File | void;

  type Resource = 'get:data' | 'put:data' | 'remove:data' | 'get:isPinExists' | 'set:pin' | 'get:token';

  interface Request<R = Resource, P = Payload> {
    resource: R;
    payload: P;
  }

  type Response = Entities.File | string | boolean | null | void;

  function sendRequest(request: Request<'get:data', Payloads.File>): Promise<Entities.File>;
  function sendRequest(request: Request<'put:data', Payloads.File>): Promise<void>;
  function sendRequest(request: Request<'remove:data', Payloads.File>): Promise<void>;
  function sendRequest(request: Request<'get:isPinExists', void>): Promise<boolean>;
  function sendRequest(request: Request<'set:pin', Payloads.SetPinCode>): Promise<boolean>;
  function sendRequest(request: Request<'get:token', Payloads.PinCode>): Promise<string | null>;
}
