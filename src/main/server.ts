import {createServer} from 'node:http';

export const server = createServer((request, response) => {
  response.end('Hello World!');
});

// server.listen({
//   host: 'localhost',
//   port: 0,
// }, () => {
//   console.log('Started');

//   const address = server.address();

//   if (typeof address === 'object') {
//     console.log(address.port);
//   }

// });

export default server;
