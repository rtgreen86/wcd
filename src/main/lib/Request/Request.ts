export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type RequestWithHeader<Header> = {
  uri: string,
  header: { [key: string]: string | number | boolean | Array<string | number | boolean> } & Header
}

type RequestWithBody<Header, Body> = RequestWithHeader<Header> & {
  body: Body
}

type GetRequest<Header> = RequestWithHeader<Header> & {
  method: RequestMethod.GET
}

type DeleteRequest<Header> = RequestWithHeader<Header> & {
  method: RequestMethod.DELETE
}

type PostRequest<Header, Body> = RequestWithBody<Header, Body> & {
  method: RequestMethod.POST
}

type PutRequest<Header, Body> = RequestWithBody<Header, Body> & {
  method: RequestMethod.PUT
}

export type Request<Header, Body> = GetRequest<Header> | DeleteRequest<Header> | PostRequest<Header, Body> | PutRequest<Header, Body>;
