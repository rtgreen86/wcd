declare namespace electronAPI {
    enum Method {
        Get = 'GET',
        Post = 'POST',
        Put = 'PUT'
    }

    type Request = {
        uri: string,
        method: Method,
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
