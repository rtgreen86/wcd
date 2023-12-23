import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getSysInfo: () => ipcRenderer.invoke('get-sysinfo'),
  showAbout: () => ipcRenderer.invoke('show-about'),

  fs: {
    put(filename, options) {
      ipcRenderer.send('fs:put', filename, options);
    },

    get(filename, tokenOrOptions) {
      const options = typeof tokenOrOptions === 'object'
        ? tokenOrOptions
        : {};
      if (typeof tokenOrOptions === 'string') {
        options.token = tokenOrOptions;
      }
      return ipcRenderer.invoke('fs:get', filename, options);
    }
  },

  getPin() {
    return ipcRenderer.invoke('get-pin');
  }
});
