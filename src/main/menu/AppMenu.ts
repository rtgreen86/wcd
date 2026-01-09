import { Menu } from 'electron';

const isMac = process.platform === 'darwin';

const menu = Menu.buildFromTemplate([
  ...(isMac ? [{ role: 'appMenu' as const }] : []),
  {
    role: 'fileMenu',
    submenu: [
      { label: 'Export', accelerator: 'CommandOrControl+Alt+E', enabled: false },
      { label: 'Import', accelerator: 'CommandOrControl+Alt+I', enabled: false },
      { type: 'separator' },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  { role: 'viewMenu' },
]);

Menu.setApplicationMenu(menu);
