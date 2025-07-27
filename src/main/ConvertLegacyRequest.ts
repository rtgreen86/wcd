import { IpcRequest, IpcPayload, RequestType } from '@shared/types';

export function convertLegacyRequest(request: any): IpcRequest {
  if (request.type === 'get:isPinExists') {
    return {
      type: RequestType.getPinIsExists,
    };
  }

  if (request.type === 'set:pin') {
    return {
      type: RequestType.putPin,
      payload: {
        strings: {
          pin: request.payload.pin === '' ? null : request.payload.pin,
          newPin: request.payload.newPin,
        }
      }
    }
  }

  if (request.type === 'remove:pin') {
    return {
      type: RequestType.deletePin,
      payload: {
        strings: {
          pin: request.payload.pin === '' ? null : request.payload.pin
        }
      }
    }
  }

  if (request.type === 'get:token') {
    return {
      type: RequestType.getAuthenticate,
      payload: {
        strings: {
          pin: request.payload.pin === '' ? null : request.payload.pin,
        }
      }
    }
  }

  if (request.type === 'get:data') {
    return {
      type: RequestType.getData,
      payload: {
        strings: {
          token: request.payload.token,
        }
      }
    }
  }

  if (request.type === 'put:data') {
    return {
      type: RequestType.putData,
      payload: {
        strings: {
          token: request.payload.token,
          data: request.payload.content,
        }
      }
    }
  }
}

export function convertLegacyResponse(requst: IpcRequest, payload: IpcPayload) {
  if (requst.type === RequestType.getPinIsExists) {
    return payload?.flags?.pinExists;
  }
  if (requst.type === RequestType.putPin) {
    return payload.flags?.success;
  }
  if (requst.type === RequestType.deletePin) {
    return payload.flags?.success;
  }
  if (requst.type === RequestType.getAuthenticate) {
    return payload.strings?.token;
  }
  if (requst.type === RequestType.getData) {
    return {
      name: '',
      content: payload.strings?.data
    }
  }
  if (requst.type === RequestType.putData) {
    return {
      name: '',
    }
  }
}
