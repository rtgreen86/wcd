declare namespace electronAPI {
    type Request = import('../lib/Request').Request;
    type Response = import('../lib/Request').Response;
}

declare namespace electronAPI {
    function request(request: Request): Promise<Response>;
}
