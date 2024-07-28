import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  sendRequest: (request) => ipcRenderer.invoke('send-request', request),
  showAbout: () => ipcRenderer.invoke('show-about'),
});
