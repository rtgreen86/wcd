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
      token?: string,
      body: string,
    }

    type LoadOptions = {
      token?: string,
    }

    function put(filename: string, options: SaveOptions): void;

    function get(filename: string, token: string): Promise<string | null>

    function get(filename: string, options: LoadOptions): Promise<string | null>
  }
}
