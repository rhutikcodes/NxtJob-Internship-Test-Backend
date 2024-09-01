import { Server } from "http";
import WebSocket, { WebSocketServer } from "ws";

class WebSocketManager {
  private wss: WebSocketServer;

  constructor(server: Server) {
    if (!server) {
      throw new Error("An HTTP server instance must be provided.");
    }

    this.wss = new WebSocketServer({ server });

    this.wss.on("connection", (ws: WebSocket) => {
      ws.on("message", (message: string) => {
        console.log(`Received: ${message}`);
      });

      ws.send("Connection established");
    });
  }

  broadcast(message: string) {
    this.wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

export default WebSocketManager;
