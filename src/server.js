import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(404).end();
});

server.listen(3333);