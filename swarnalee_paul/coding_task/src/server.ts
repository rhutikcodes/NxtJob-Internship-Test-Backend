import app from "./app";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { createServerAdapter } from "@whatwg-node/server";

// Create a Fetch adapter for the Hono app
const fetchHandler = createServerAdapter(app.fetch);

// Create the HTTP server and use the Fetch adapter
const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  fetchHandler(req, res).catch((err) => {
    console.error("Error processing request:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  });
});

// Start the server on port 3002
server.listen(3002, () => {
  console.log("Server is running on port 3002");
});
