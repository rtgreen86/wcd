import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  sendRequest: (request) => ipcRenderer.invoke('send-request', request),
  getSysInfo: () => ipcRenderer.invoke('get-sysinfo'),
  showAbout: () => ipcRenderer.invoke('show-about'),
});
