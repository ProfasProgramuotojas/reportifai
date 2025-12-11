/**
 * Real-Time Event Service
 * Manages Server-Sent Events (SSE) for broadcasting conversation updates
 * to all connected clients in real-time.
 */

class ConversationEventEmitter {
  constructor() {
    this.clients = new Set();
  }

  /**
   * Add a new SSE client
   * @param {Response} response - The SSE response stream
   */
  addClient(response) {
    this.clients.add(response);
    console.log(`[SSE] Client connected. Total clients: ${this.clients.size}`);
  }

  /**
   * Remove a disconnected client
   * @param {Response} response - The SSE response stream
   */
  removeClient(response) {
    this.clients.delete(response);
    console.log(`[SSE] Client disconnected. Total clients: ${this.clients.size}`);
  }

  /**
   * Broadcast a conversation event to all connected clients
   * @param {Object} data - The event data
   * @param {string} data.status - The status message to display
   * @param {string} data.type - The event type (thinking, investigating, resolving, resolved)
   * @param {string} data.timestamp - ISO timestamp
   * @param {Object} data.metadata - Additional metadata
   */
  broadcast(data) {
    const event = {
      ...data,
      timestamp: data.timestamp || new Date().toISOString(),
    };

    console.log(`[SSE] Broadcasting to ${this.clients.size} clients:`, event);

    const payload = `data: ${JSON.stringify(event)}\n\n`;

    // Send to all connected clients
    for (const client of this.clients) {
      try {
        client.write(payload);
      } catch (error) {
        console.error('[SSE] Error writing to client:', error);
        this.clients.delete(client);
      }
    }
  }

  /**
   * Send a heartbeat ping to keep connections alive
   */
  sendHeartbeat() {
    const payload = `: heartbeat\n\n`;
    for (const client of this.clients) {
      try {
        client.write(payload);
      } catch (error) {
        console.error('[SSE] Heartbeat failed:', error);
        this.clients.delete(client);
      }
    }
  }
}

// Singleton instance
const conversationEvents = new ConversationEventEmitter();

// Keep connections alive with heartbeat every 30 seconds
setInterval(() => {
  conversationEvents.sendHeartbeat();
}, 30000);

export default conversationEvents;
