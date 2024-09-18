import { WebSocketServer } from 'ws';

class WebSocketManager {
  constructor(server) {
    if (!server) {
      throw new Error('An HTTP server instance must be provided.');
    }

    this.wss = new WebSocketServer({ server });

    this.wss.on('connection', (ws) => {
      ws.on('message', (message) => {
        console.log(`Received: ${message}`);
      });

      ws.send('Connection established');
    });
  }

  broadcast(message) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocketServer.OPEN) {
        client.send(message);
      }
    });
  }
}

export default WebSocketManager;
