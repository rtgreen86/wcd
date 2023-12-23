declare namespace electronAPI {
  declare namespace fs {
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

  function getPin(): Promise<string | null>;
}
