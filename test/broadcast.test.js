import { Hub } from '../src/broadcast.js';
import { test } from 'node:test';
import assert from 'node:assert';

test('Hub should broadcast messages to subscribers', () => {
  const hub = new Hub();
  const topic = 'test-topic';
  const event = { message: 'Hello, SSE!' };
  let receivedMessage1, receivedMessage2;

  // Subscribe two clients
  const unsubscribe1 = hub.subscribe(topic, (message) => receivedMessage1 = message);
  const unsubscribe2 = hub.subscribe(topic, (message) => receivedMessage2 = message);

  // Publish an event
  hub.publish(topic, event);

  // Assert both clients received the message
  assert.strictEqual(receivedMessage1, `data: ${JSON.stringify(event)}\n\n`);
  assert.strictEqual(receivedMessage2, `data: ${JSON.stringify(event)}\n\n`);

  // Unsubscribe one client
  unsubscribe2();

  // Publish another event
  const newEvent = { message: 'Another message' };
  receivedMessage2 = null;
  hub.publish(topic, newEvent);

  // Assert only the first client received the new message
  assert.strictEqual(receivedMessage1, `data: ${JSON.stringify(newEvent)}\n\n`);
  assert.strictEqual(receivedMessage2, null);
});