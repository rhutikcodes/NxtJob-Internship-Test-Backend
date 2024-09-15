import { WebSocket } from 'ws';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const wss = new WebSocket.Server({ port: 8080 });

// WebSocket handler for real-time collaboration
export const handleWebSocketSession = (req, res) => {
  const { documentId } = req.query;

  if (!documentId) {
    return res.status(400).json({ error: 'Document ID required' });
  }

  const [client, server] = Object.values(new WebSocketPair());

  server.accept();
  server.documentId = documentId;

  server.addEventListener('message', async (event) => {
    const { content, userId } = JSON.parse(event.data);

    // Save changes to the document
    await prisma.document.update({
      where: { id: Number(documentId) },
      data: { content },
    });

    // Broadcast the changes to other collaborators
    broadcastDocumentChange(documentId, content, userId);
  });

  server.addEventListener('close', () => {
    console.log(`WebSocket connection closed for document ${documentId}`);
  });

  return new Response(null, { status: 101, webSocket: client });
};

// Broadcast changes to other collaborators
function broadcastDocumentChange(documentId, content, userId) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.documentId === documentId) {
      client.send(JSON.stringify({ content, userId }));
    }
  });
}
