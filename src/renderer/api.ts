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

export async function exportData() {
  window.electronAPI2.export();
}

export async function importData() {
  window.electronAPI2.dispatch({ type: "import" });
}



export function init() {
  return electronAPI3.dispatch({ type: 'data:init', payload: { token: 'token' } });
};

export function getData(token: string, key: string) {
  return electronAPI3.dispatch({
    type: 'data:get',
    payload: { token, key }
  });
}

export function putData(token: string, key: string, content: string) {
  return electronAPI3.dispatch({
    type: 'data:put',
    payload: { token, key, content }
  });
}

export function wipeData(token: string, key: string) {
  return electronAPI3.dispatch({
    type: 'data:wipe',
    payload: { token, key }
  });
}

export async function getMarks(token: string): Promise<string[]> {
  const response = await getData(token, 'marks.json');

  if (response.status === 'fail') {
    throw new Error(response.payload.message, { cause: response.payload.error });
  }

  const { content } = response.payload;

  if (content === '') {
    return [];
  }

  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error('Error while receiving data.', { cause: error });
  }
}

export async function putMarks(token: string, marks: string[]): Promise<void> {
  const content = JSON.stringify(marks);
  const response = await putData(token, 'marks.json', content);
  if (response.status === 'fail') {
    throw new Error(response.payload.message, { cause: response.payload.error });
  }
}

export async function wipeMarks(token: string): Promise<void> {
  const response = await wipeData(token, 'marks.json');
  if (response.status === 'fail') {
    throw new Error(response.payload.message, { cause: response.payload.error });
  }
}
