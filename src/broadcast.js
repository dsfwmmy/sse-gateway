export class Hub {
  constructor() {
    this.subscriptions = new Map();
  }

  subscribe(topic, callback) {
    if (!this.subscriptions.has(topic)) {
      this.subscriptions.set(topic, new Set());
    }
    this.subscriptions.get(topic).add(callback);
    return () => this.unsubscribe(topic, callback);
  }

  unsubscribe(topic, callback) {
    if (this.subscriptions.has(topic)) {
      this.subscriptions.get(topic).delete(callback);
      if (this.subscriptions.get(topic).size === 0) {
        this.subscriptions.delete(topic);
      }
    }
  }

  publish(topic, event) {
    if (this.subscriptions.has(topic)) {
      const message = `data: ${JSON.stringify(event)}\n\n`;
      this.subscriptions.get(topic).forEach(callback => callback(message));
    }
  }
}