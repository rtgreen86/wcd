const { contextBridge, ipcRenderer } = require('electron');

const electronApi: ElectronAPI = {
  dispatch: (request) => ipcRenderer.invoke('ipc-dispatch', request),
  getSystemLocale: () => ipcRenderer.invoke('get-system-locale'),

  // @ts-ignore
  ipcRequest: (request: any) => ipcRenderer.invoke('ipc-request', request), // @ts-ignore
  showAbout: () => ipcRenderer.invoke('show-about'),
}

contextBridge.exposeInMainWorld('electronAPI', electronApi);
