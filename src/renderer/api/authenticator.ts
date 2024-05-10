export function isPinExist() {
  return electronAPI.sendRequest({
    type: 'get:isPinExists',
    payload: undefined
  });
}

export function setPin(pin: string, newPin: string) {
  return electronAPI.sendRequest({
    type: 'set:pin',
    payload: { pin, newPin }
  });
}

export function removePin(pin: string) {
  return electronAPI.sendRequest({
    type: 'remove:pin',
    payload: { pin }
  });
}

export function getToken(pin: string) {
  return electronAPI.sendRequest({
    type: 'get:token',
    payload: { pin }
  });
}
