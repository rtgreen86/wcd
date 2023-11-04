import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  storageGet: (filename) => ipcRenderer.invoke('storage-get', filename),
  storagePut: (filename, content) => ipcRenderer.invoke('storage-put', filename, content),
  getSysInfo: () => ipcRenderer.invoke('get-sysinfo'),
  showAbout: () => ipcRenderer.invoke('show-about'),
  request: (request) => ipcRenderer.invoke('request', request),
  saveFile: (content) => ipcRenderer.invoke('saveFile', content),
  loadFile: () => ipcRenderer.invoke('loadFile'),

  fs: {
    saveUserFile: (payload) => ipcRenderer.invoke('fs-save-user-file', payload),
    loadUserFile: (payload) => ipcRenderer.invoke('fs-load-user-file', payload)
  }
});
