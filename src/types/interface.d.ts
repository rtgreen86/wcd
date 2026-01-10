export interface ElectronAPI2 {
  export(): Promise<void>;
  dispatch(request: WCD.Request);
}

declare global {
  interface Window {
    electronAPI2: ElectronAPI2
  }
}

export {};