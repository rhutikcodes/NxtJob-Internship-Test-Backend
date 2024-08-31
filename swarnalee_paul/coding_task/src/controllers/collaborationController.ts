import { Context } from "hono";
import { PrismaClient } from "@prisma/client";
import { webSocketManager } from "../server"; // Adjust the path as needed

const prisma = new PrismaClient();

export const addCollaborator = async (c: Context) => {
  const body = await c.req.json();
  const { documentId, userId, accessType } = body;

  try {
    // Create a new permission record
    const permission = await prisma.permission.create({
      data: { documentId, userId, accessType },
    });

    // Broadcast a message about the new collaborator
    webSocketManager.broadcast(
      `User ${userId} was added as a collaborator on document ${documentId} with access type ${accessType}`
    );

    // Return the created permission record
    return c.json(permission, 201);
  } catch (error) {
    // Handle errors and return an appropriate response
    return c.json({ error: (error as Error).message }, 400);
  }
};
