import app from "./app";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { createServerAdapter } from "@whatwg-node/server";

import WebSocketManager from "./utils/WebSocketManager";

const fetchHandler = createServerAdapter(app.fetch);


const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  fetchHandler(req, res).catch((err) => {
    console.error("Error processing request:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  });
});

const webSocketManager = new WebSocketManager(server);



server.listen(3002, () => {
  console.log("Server is running on port 3002");
});
export { server, webSocketManager };