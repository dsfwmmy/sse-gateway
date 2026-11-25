import { createGateway } from '../src/gateway.js';
import { test } from 'node:test';
import assert from 'node:assert';

let server;
const PORT = 3000;

test.beforeEach(() => {
  server = createGateway();
  server.listen(PORT);
});

test.afterEach(() => {
  server.close();
});

test('should start the server', () => {
  assert.ok(server.listening);
});