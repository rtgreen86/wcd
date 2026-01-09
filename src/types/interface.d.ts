export interface ElectronAPI2 {
  export(): Promise<void>;
  import(): Promise<void>;
}

declare global {
  interface Window {
    electronAPI2: ElectronAPI2
  }
}

export {};