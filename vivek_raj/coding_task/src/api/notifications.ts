import { WebSocket } from 'ws';

const wss = new WebSocket.Server({ port: 8080 });

// Notify collaborators on document updates
export const notifyCollaborators = (documentId, message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.documentId === documentId) {
      client.send(JSON.stringify(message));
    }
  });
};
