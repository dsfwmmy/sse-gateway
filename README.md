# SSE Gateway

A zero-dependency Server-Sent Events (SSE) streaming gateway for Node.js.

## Features
- `/stream` endpoint for SSE connections.
- Automatic heartbeat every 15 seconds.
- Topic-based message broadcasting.

## API

### `createGateway()`
Returns an HTTP server configured for SSE.

### `Hub` class
- `subscribe(topic, callback)`: Subscribe to a topic.
- `unsubscribe(topic, callback)`: Unsubscribe from a topic.
- `publish(topic, event)`: Broadcast an event to all subscribers of a topic.

## Example
```bash
curl -N http://localhost:3000/stream
```

## Known Limitations
- No authentication or authorization.
- No persistent message storage.

## Running Tests
```bash
npm test
```