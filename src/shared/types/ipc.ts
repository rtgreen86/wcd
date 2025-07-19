import { RequestType } from '../enums/RequestType';

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
