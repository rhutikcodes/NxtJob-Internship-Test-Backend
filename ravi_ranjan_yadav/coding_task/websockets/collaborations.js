import WebSocket from 'ws';

export const setupWebSocketServer = (app) => {
  // Create a WebSocket server
  const wss = new WebSocket.Server({ noServer: true });
  const documentRooms = new Map(); // Keeps track of active rooms for documents

  // Integrate WebSocket server with HTTP server
  app.server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  // Handle WebSocket connections
  wss.on('connection', (ws) => {
    let currentRoom = null;

    // Handle incoming messages
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);

        if (data.type === 'join') {
          currentRoom = data.documentId;
          if (!documentRooms.has(currentRoom)) {
            documentRooms.set(currentRoom, new Set());
          }
          documentRooms.get(currentRoom).add(ws);
        }

        if (data.type === 'update') {
          const room = documentRooms.get(currentRoom);
          if (room) {
            room.forEach((client) => {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                  type: 'update',
                  content: data.content,
                  user: data.user,
                }));
              }
            });
          }
        }
      } catch (error) {
        console.error('Failed to handle message:', error);
      }
    });

    // Handle WebSocket closure
    ws.on('close', () => {
      if (currentRoom) {
        const room = documentRooms.get(currentRoom);
        if (room) {
          room.delete(ws);
          // Clean up if the room is empty
          if (room.size === 0) {
            documentRooms.delete(currentRoom);
          }
        }
      }
    });
  });
};
