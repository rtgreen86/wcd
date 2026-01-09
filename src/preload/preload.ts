const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  init: () => ipcRenderer.invoke('init'),
  ipcRequest: (request: electronAPI.IpcRequest) => ipcRenderer.invoke('ipc-request', request),
  showAbout: () => ipcRenderer.invoke('show-about'),
});
