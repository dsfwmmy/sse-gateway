import http from 'http';

export function createGateway() {
  let clientId = 0;
  const clients = new Map();

  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/stream') {
      const id = ++clientId;
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      });

      res.write('event: ready\n\n');

      const pingInterval = setInterval(() => {
        res.write(': ping\n\n');
      }, 15000);

      clients.set(id, { res, pingInterval });

      req.on('close', () => {
        clearInterval(clients.get(id).pingInterval);
        clients.delete(id);
      });
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  return server;
}