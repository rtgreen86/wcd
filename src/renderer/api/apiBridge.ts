export async function getToken(pin: string | null) {
  const response = await window.electronAPI.ipcRequest({
    type: 'get:authenticate', pin
  });
  return response.success && response.strings?.token
    ? response.strings.token
    : null;
}

export async function setPin(currentPin: string | null, newPin: string | null) {
  const response = await window.electronAPI.ipcRequest({
    type: 'put:pin',
    currentPin,
    newPin,
  });
  return response.success;
}

export async function deletePin(pin: string) {
  const response = await window.electronAPI.ipcRequest({
    type: 'delete:pin',
    pin
  });
  return response.success;
}

export async function isPinExists() {
  const response = await window.electronAPI.ipcRequest({
    type: 'get:pin-exists'
  });
  return response.flags?.pinExists || false;
}

export async function getData() {
  const response = await window.electronAPI.ipcRequest({
    type: 'get:data'
  });

  const data = response.strings?.data;
  if (!response.success || !data) {
    throw new Error('Error while receiving data.');
  }

  return data;
}

export async function getMarks(): Promise<string[]> {
  const data = await getData();
  try {
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Error while receiving data.', {cause: error});
  }
}

export async function putData(data: string) {
  const response = await window.electronAPI.ipcRequest({
    type: 'put:data',
    data
  });
  return response.success;
}

export async function putMarks(marks: string[]) {
  return await putData(JSON.stringify(marks));
}
