const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  showAbout: () => ipcRenderer.invoke('show-about'),
  ipcRequest: (request) => ipcRenderer.invoke('ipc-request', request)
});
