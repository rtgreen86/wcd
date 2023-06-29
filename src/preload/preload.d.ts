declare namespace electronAPI {
    type Request = {
        uri: string,
        method: import('./Method').Method,
        params: unknown,
        body: unknown
    }

    type Response = {
        body: unknown
    }
}

declare namespace electronAPI {
    function request(request: Request): Promise<string>;
}
