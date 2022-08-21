const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadRecords: () => ipcRenderer.invoke('load-records'),
  saveRecords: (payload) => ipcRenderer.invoke('save-records', payload),
  getSysInfo: () => `Electron ${process.versions.electron}; Chrome ${process.versions.chrome}; Node ${process.versions.node}`
});
