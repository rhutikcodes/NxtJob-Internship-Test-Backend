import WebSocket, { Server as WebSocketServer } from 'ws';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const connections = new Map<number, WebSocket[]>();

export const setupWebSocketServer = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket, req: any) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const docId = parseInt(url.searchParams.get('docId') || '0');
    const userId = parseInt(url.searchParams.get('userId') || '0');

    setupWebSocket(ws, docId, userId);
  });
};

const setupWebSocket = (ws: WebSocket, docId: number, userId: number) => {
  if (!connections.has(docId)) {
    connections.set(docId, []);
  }

  connections.get(docId)?.push(ws);

  ws.on('message', async (data) => {
    const message = JSON.parse(data.toString());

    if (message.type === 'edit') {
      await prisma.document.update({
        where: { id: docId },
        data: { content: message.content },
      });

      connections.get(docId)?.forEach((conn) => {
        if (conn !== ws) {
          conn.send(JSON.stringify({ type: 'update', content: message.content }));
        }
      });
    }
  });

  ws.on('close', () => {
    const index = connections.get(docId)?.indexOf(ws);
    if (index !== undefined && index > -1) {
      connections.get(docId)?.splice(index, 1);
    }
  });
};
