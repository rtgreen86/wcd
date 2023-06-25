import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  storageGet: (filename) => ipcRenderer.invoke('storage-get', filename),
  storagePut: (filename, content) => ipcRenderer.invoke('storage-put', filename, content),
  getSysInfo: () => ipcRenderer.invoke('get-sysinfo'),
  showAbout: () => ipcRenderer.invoke('show-about'),
  request: (request) => ipcRenderer.invoke('request', request)
});
