export async function isPinExist() {
  return electronAPI.sendRequest({
    resource: 'get:isPinExists',
    payload: undefined,
  });
}

export async function setPin(pin: string, newPin: string) {
  return electronAPI.sendRequest({
    resource: 'set:pin',
    payload: { type: 'set-pin', pin, newPin }
  });
}
