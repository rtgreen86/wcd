import { IPCRequest, IPCResponse } from '@shared/types';
import { RequestType } from '@shared/enums';

export function convertLegacyRequest(request: any): IPCRequest {
  if (request.type === 'get:isPinExists') {
    return {
      type: RequestType.PIN_IS_EXISTS,
    };
  }

  if (request.type === 'set:pin') {
    return {
      type: RequestType.PIN_SET,
      payload: {
        pin: request.payload.pin === '' ? null : request.payload.pin,
        newPin: request.payload.newPin,
      }
    }
  }

  if (request.type === 'remove:pin') {
    return {
      type: RequestType.PIN_REMOVE,
      payload: {
        pin: request.payload.pin === '' ? null : request.payload.pin
      }
    }
  }

  if (request.type === 'get:token') {
    return {
      type: RequestType.AUTHENTICATE,
      payload: {
        pin: request.payload.pin === '' ? null : request.payload.pin,
      }
    }
  }

  if (request.type === 'get:data') {
    return {
      type: RequestType.DATA_GET,
      payload: {
        token: request.payload.token,
      }
    }
  }

  if (request.type === 'put:data') {
    return {
      type: RequestType.DATA_PUT,
      payload: {
        token: request.payload.token,
        data: request.payload.content,
      }
    }
  }
}

export function convertLegacyResponse(response: IPCResponse) {
  if (response.type === RequestType.PIN_IS_EXISTS) {
    return response.payload.isExists;
  }
  if (response.type === RequestType.PIN_SET) {
    return response.payload.success;
  }
  if (response.type === RequestType.PIN_REMOVE) {
    return response.payload.success;
  }
  if (response.type === RequestType.AUTHENTICATE) {
    return response.payload.token;
  }
  if (response.type === RequestType.DATA_GET) {
    return {
      name: '',
      content: response.payload.data
    }
  }
  if (response.type === RequestType.DATA_PUT) {
    return {
      name: '',
    }
  }
}
