import { Menu } from 'electron';

const isMac = process.platform === 'darwin';

const menu = Menu.buildFromTemplate([
  ...(isMac ? [{ role: 'appMenu' as const }] : []),
  {
    role: 'fileMenu',
    submenu: [
      { id: 'export', label: 'Export', accelerator: 'CommandOrControl+Alt+E', enabled: false },
      { id: 'import', label: 'Import', accelerator: 'CommandOrControl+Alt+I', enabled: false },
      { type: 'separator' },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  { role: 'viewMenu' },
]);

export class AppMenu {
  static handleSignIn() {
    const menu = Menu.getApplicationMenu();
    menu.getMenuItemById('export').enabled = true;
    menu.getMenuItemById('import').enabled = true;
  }

  static handleSignOut() {
    const menu = Menu.getApplicationMenu();
    menu.getMenuItemById('export').enabled = false;
    menu.getMenuItemById('import').enabled = false;
  }
}

Menu.setApplicationMenu(menu);

export default AppMenu;
