import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * @deprecated
   */
  sendRequest: (request) => ipcRenderer.invoke('send-request', request),
  showAbout: () => ipcRenderer.invoke('show-about'),
  ipcRequest: (request) => ipcRenderer.invoke('ipc-request', request)
});
