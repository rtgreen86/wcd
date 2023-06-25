export default function f(event: unknown, request: electronAPI.Request) {
  console.log(JSON.stringify(event));
  console.log(typeof request, request.uri, JSON.stringify(request.params));
}
