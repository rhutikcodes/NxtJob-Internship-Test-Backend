import app from "./app.js";
import { createServer } from "http";
import { createServerAdapter } from "@whatwg-node/server";
import WebSocketManager from "./utlils/WebSocket.js";

const fetchHandler = createServerAdapter(app.fetch);

const server = createServer((req, res) => {
  fetchHandler(req, res).catch((err) => {
    console.error("Error processing request:", err.stack || err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  });
});


const webSocketManager = new WebSocketManager(server);

// Start server and listen on port 3001
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
process.on('SIGTERM', () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("HTTP server closed.");
    webSocketManager.wss.close(() => {
      console.log("WebSocket server closed.");
      process.exit(0);
    });
  });
});

export { server, webSocketManager };
