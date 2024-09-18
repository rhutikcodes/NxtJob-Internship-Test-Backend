import { PrismaClient } from "@prisma/client";
import WebSocketManager from "../utlils/WebSocket.js";

const prisma = new PrismaClient();

export const addCollaborator = async (c) => {
  try {
    const body = await c.req.json();
    const { documentId, userId, accessType } = body;

    if (!documentId || !userId || !accessType) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const permission = await prisma.permission.create({
      data: { documentId, userId, accessType },
    });

    WebSocketManager.broadcast(
      `User ${userId} was added as a collaborator on document ${documentId} with access type ${accessType}`
    );

    return c.json({ message: "Collaborator added successfully", permission }, 201);
  } catch (error) {
    // Return 500 for internal server errors
    return c.json({ error: "Internal Server Error", details: (error).message }, 500);
  }
};
