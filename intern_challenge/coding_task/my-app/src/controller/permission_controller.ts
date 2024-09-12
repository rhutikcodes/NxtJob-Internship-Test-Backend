import { PrismaClient } from "@prisma/client";
import { Context } from "hono";

const prisma = new PrismaClient();

export const shareDocument = async (c: Context) => {
  try {
    const { documentId, userId, permission } = await c.req.json();
    
    const sharedDocument = await prisma.documentPermission.create({
      data: {
        documentId,
        userId,
        permission,
      }
    });

    return c.json(sharedDocument, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to share document" }, 500);
  } finally {
    await prisma.$disconnect();
  }
};
