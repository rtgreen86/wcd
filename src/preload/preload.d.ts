declare namespace electronAPI {
    type Request = {
        uri: string,
        params: unknown
    }
}

declare namespace electronAPI {
    function request(request: Request): Promise<string>;
}
