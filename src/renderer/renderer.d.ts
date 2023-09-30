export interface ElectronAPI {
  saveFile: (content: string) => Promise<void>,
  loadFile: () => Promise<string>,
}

declare global {
  interface Window {
    electronAPI: electronAPI
  }
}
