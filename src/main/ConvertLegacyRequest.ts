export function convertLegacyRequest(request: any): electronAPI.IpcRequest {
  if (request.type === 'get:isPinExists') {
    return {
      type: 'get:pin-exists',
    };
  }

  if (request.type === 'set:pin') {
    return {
      type: 'put:pin',
      currentPin: request.payload.pin === '' ? null : request.payload.pin,
      newPin: request.payload.newPin === '' ? null : request.payload.newPin
    }
  }

  if (request.type === 'remove:pin') {
    return {
      type: 'delete:pin',
      pin: request.payload.pin === '' ? null : request.payload.pin
    }
  }

  if (request.type === 'get:token') {
    return {
      type: 'get:authenticate',
      pin: request.payload.pin === '' ? null : request.payload.pin,
    }
  }

  if (request.type === 'get:data') {
    return {
      type: 'get:data',
      token: request.payload.token,
    }
  }

  if (request.type === 'put:data') {
    return {
      type: 'put:data',
      token: request.payload.token,
      data: request.payload.content,
    }
  }
}

export function convertLegacyResponse(requst: electronAPI.IpcRequest, payload: electronAPI.IpcResponse) {
  if (requst.type === 'get:pin-exists') {
    return payload?.flags?.pinExists;
  }
  if (requst.type === 'put:pin') {
    return payload.success;
  }
  if (requst.type === 'delete:pin') {
    return payload.success;
  }
  if (requst.type === 'get:authenticate') {
    return payload.strings?.token;
  }
  if (requst.type === 'get:data') {
    return {
      name: '',
      content: payload.strings?.data
    }
  }
  if (requst.type === 'put:data') {
    return {
      name: '',
    }
  }
}
