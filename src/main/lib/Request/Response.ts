export type Response<Body> = {
  success: boolean,
  body?: Body,
  error?: Error
}
