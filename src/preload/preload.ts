const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI2', {
  export: () => ipcRenderer.invoke('ipc-request-2', { type: 'export' }),
  dispatch: (request: WCD.Request) => ipcRenderer.invoke('ipc-request-2', request)
});

const electronApi: ElectronAPI = {
  async dispatch(request) {
    try {
      return await ipcRenderer.invoke('ipc-dispatch', request);
    } catch (error) {
      if (error instanceof Error) {
        return { type: request.type, status: 'fail', payload: error.message, error };
      }
      return { type: request.type, status: 'fail', payload: String(error), error: new Error(String(error)) };
    }
  },

  getSystemLocale: () => ipcRenderer.invoke('get-system-locale'),

  // @ts-ignore
  ipcRequest: (request: any) => ipcRenderer.invoke('ipc-request', request), // @ts-ignore
  showAbout: () => ipcRenderer.invoke('show-about'),
}

contextBridge.exposeInMainWorld('electronAPI', electronApi);
