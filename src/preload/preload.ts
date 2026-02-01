const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  init: () => ipcRenderer.invoke('init'),
  ipcRequest: (request: electronAPI.IpcRequest) => ipcRenderer.invoke('ipc-request', request),
  showAbout: () => ipcRenderer.invoke('show-about'),
});

contextBridge.exposeInMainWorld('electronAPI2', {
  export: () => ipcRenderer.invoke('ipc-request-2', { type: 'export' }),
  dispatch: (request: WCD.Request) => ipcRenderer.invoke('ipc-request-2', request)
});

const electronApi3: ElectronAPI3 = {
  async dispatch(request) {
    try {
      return await ipcRenderer.invoke('ipc-dispatch', request);
    } catch (error) {
      if (error instanceof Error) {
        return { status: 'fail', payload: error };
      }
      return { status: 'fail', payload: new Error(String(error)) };
    }
  },
}

contextBridge.exposeInMainWorld('electronAPI3', electronApi3);
