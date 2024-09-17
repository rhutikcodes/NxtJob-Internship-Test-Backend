import { Router } from 'hono';
import WebSocket from 'ws';

const collaborationRouter = new Router();

const wsServer = new WebSocket.Server({ noServer: true });

wsServer.on('connection', (socket) => {
  socket.on('message', (message) => {
    // Handle real-time changes
  });
});

collaborationRouter.get('/ws', (ctx) => {
  // WebSocket route
});

export default collaborationRouter;
