declare namespace electronAPI {
  type Request = import('../lib/Request').Request;
  type Response = import('../lib/Request').Response;
}

declare namespace electronAPI {
  function request(request: Request): Promise<Response>;
}

declare namespace electronAPI {
  type SavePayload = {
    name: string,
    token: string,
    content: string,
  };

  type LoadPayload = {
    name: string,
    token: string,
  };

  export interface FS {
    saveUserFile(payload: SavePayload): Promise<void>
    loadUserFile(payload: LoadPayload): Promise<string>
  }

  export interface ElectronAPI {
    fs: FS,
  }

  declare namespace fs {
    function saveUserFile(payload: SavePayload): Promise<void>;
    function loadUserFile(payload: LoadPayload): Promise<string>;

    type SaveOptions = {
      key?: string,
      body: string,
    }

    type LoadOptions = {
      key?: string,
    }

    function save(filename: string, options: SaveOptions): void;

    function load(filename: string, key: string): Promise<string | null>

    function load(filename: string, options: LoadOptions): Promise<string | null>
  }
}
