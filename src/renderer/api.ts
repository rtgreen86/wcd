export function init() {
  return window.electronAPI.init();
}

export async function checkPinExists() {
  const response = await window.electronAPI.ipcRequest({
    endpoint: 'get:check-has-pin'
  });

  if (!response.success) {
    throw new Error(response.message || 'Unexpected error on checkPinExists');
  }

  return Boolean(response.payload?.flags?.hasPin);
}

export async function getToken(pin: string | null) {
  const response = await window.electronAPI.ipcRequest({
    endpoint: 'get:token',
    payload: {
      strings: { pin }
    }
  });

  return response.success
    ? response.payload?.strings?.token || null
    : null;
}

export async function signOut() {
  await window.electronAPI.ipcRequest({
    endpoint: 'put:reset-tokens'
  });
};

export async function setPin(pin: string | null, newPin: string | null) {
  const response = await window.electronAPI.ipcRequest({
    endpoint: 'put:pin',
    payload: {
      strings: { pin, newPin }
    }
  });
  return response.success;
}

export async function removePin(pin: string | null) {
  const response = await window.electronAPI.ipcRequest({
    endpoint: 'put:remove-pin',
    payload: {
      strings: { pin }
    }
  });
  return response.success;
}

export async function getData() {
  const response = await window.electronAPI.ipcRequest({
    endpoint: 'get:data'
  });

  if (!response.success) {
    throw new Error(response.message || 'Unexpected error on read data.');
  }

  return response.payload?.strings?.data;
}

export async function putData(data: string) {
  const response = await window.electronAPI.ipcRequest({
    endpoint: 'put:data',
    payload: {
      strings: { data }
    }
  });

  if (!response.success) {
    throw new Error(response.message || 'Unexpected error on put data.');
  }
}

export async function getMarks(): Promise<string[]> {
  const data = await getData();
  if (data === '') {
    return [];
  }
  try {
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Error while receiving data.', { cause: error });
  }
}

export async function putMarks(marks: string[]) {
  return await putData(JSON.stringify(marks));
}

export async function exportData() {
  window.electronAPI2.export();
}
