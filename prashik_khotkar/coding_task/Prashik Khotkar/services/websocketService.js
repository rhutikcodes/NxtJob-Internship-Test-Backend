// services/websocketService.js
const WebSocket = require('ws');
const versionModel = require('../models/versionModel');

module.exports = (prisma) => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', (ws) => {
    ws.on('message', async (data) => {
      const { documentId, changes } = JSON.parse(data);

      // Save the changes in the database
      await versionModel.createVersion(documentId, changes);

      // Notify all clients of the change
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ documentId, changes }));
        }
      });
    });
  });
};
