const { Server } = require("http");
const WebSocket = require("ws");

class WebSocketManager {
  constructor(server) {
    if (!server) {
      throw new Error("An HTTP server instance must be provided.");
    }

    this.wss = new WebSocket.Server({ server });

    this.wss.on("connection", (ws) => {
      console.log("New client connected.");

      ws.on("message", (message) => {
        this.handleMessage(ws, message);
      });

      ws.on("error", (error) => {
        console.error("WebSocket error:", error);
      });

      ws.on("close", () => {
        console.log("Client disconnected.");
      });

      ws.send("Connection established");
    });
  }

  handleMessage(ws, message) {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  }

  broadcast(message) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  close() {
    this.wss.clients.forEach((client) => {
      client.close();
    });
    this.wss.close(() => {
      console.log("WebSocket server closed.");
    });
  }
}

module.exports = WebSocketManager;
