export enum RequestType {
  getPinIsExists = 'get:pin-is-exists',
  putPin = 'put:pin',
  deletePin = 'delete:pin',
  getAuthenticate = 'get:authenticate',
  getData = 'get:data',
  putData = 'put:data'
};

export type IpcPayload = {
  strings?: Record<string, string>,
  numbers?: Record<string, number>,
  flags?: Record<string, boolean>,
  data?: Record<string, unknown>
};

export type IpcRequest = {
  type: RequestType,
  payload?: IpcPayload,
}
