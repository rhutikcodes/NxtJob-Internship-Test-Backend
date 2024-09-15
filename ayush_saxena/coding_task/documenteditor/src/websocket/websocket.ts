import { Hono } from "hono";
import { WebSocketServer, WebSocket } from "ws";  // Ensure correct import from 'ws'

const app = new Hono();

// Create a WebSocket server
const wss = new WebSocketServer({ port: 8080 });

// Listen for WebSocket connections
wss.on('connection', (ws: WebSocket) => {
    console.log("A new user connected");

    // Listen for messages from clients
    ws.on('message', (message: string) => {  // Expecting message as a string
        console.log(`Received: ${message}`);

        // Broadcast message to all connected clients
        wss.clients.forEach((client: WebSocket) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log("A user disconnected");
    });
});

// Export WebSocket server (optional)
export default wss;
