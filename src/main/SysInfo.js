import { app } from 'electron';

export default class SysInfo {
  static get() {
    return [
      app.getName(),
      app.getVersion(),
      `User Data: ${app.getPath('userData')}`,
      `Electron ${process.versions.electron}; Chrome ${process.versions.chrome}; Node ${process.versions.node}`,
    ].join('\n');
  }
}
