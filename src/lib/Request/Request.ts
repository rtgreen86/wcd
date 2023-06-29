import {Method} from './Method';

type CommonRequest = {
  uri: string
  params: Record<string, string | number | boolean>,
}

type ParamsRequest = CommonRequest & {
  method: Method.GET | Method.DELETE,
}

type BodyRequest = CommonRequest & {
  method: Method.POST | Method.PUT,
  body: string,
}

export type Request = ParamsRequest | BodyRequest;
