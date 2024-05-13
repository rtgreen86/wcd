export async function isPinExist() {
  // TODO: fix types
  return electronAPI.sendRequest({ type: 'get:isPinExist' }) as any as Promise<boolean>;
}

export async function setPin(pin: string, newPin: string) {
  // TODO: fix types
  return electronAPI.sendRequest({ type: 'set:pin', payload: { pin, newPin } }) as any as Promise<boolean>;
}
