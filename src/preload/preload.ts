const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  showAbout: () => ipcRenderer.invoke('show-about'),
  ipcRequest: (request: electronAPI.IpcRequest) => ipcRenderer.invoke('ipc-request', request)
});
