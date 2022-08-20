const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('Records', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  load: (name) => ipcRenderer.invoke('load', name),
  // we can also expose variables, not just functions
});
