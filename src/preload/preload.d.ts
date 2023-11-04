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

  declare namespace fs {
    function saveUserFile(payload: SavePayload): Promise<void>
    function loadUserFile(payload: LoadPayload): Promise<string>
  }
}
