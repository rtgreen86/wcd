const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadRecords: () => ipcRenderer.invoke('load-records'),
  saveRecords: (payload) => ipcRenderer.invoke('save-records', payload),
});
