import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  sendRequest: (resource, payload) => ipcRenderer.invoke('send-request', resource, payload),

  // Legacy (need types)

  getSysInfo: () => ipcRenderer.invoke('get-sysinfo'),
  showAbout: () => ipcRenderer.invoke('show-about'),
});
