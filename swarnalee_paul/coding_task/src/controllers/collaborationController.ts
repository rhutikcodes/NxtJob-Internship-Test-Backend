import { Context } from "hono";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addCollaborator = async (c: Context) => {
 
  const body = await c.req.json();
  const { documentId, userId, accessType } = body;

  try {
    const permission = await prisma.permission.create({
      data: { documentId, userId, accessType },
    });
    return c.json(permission, 201); 
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400); 
  }
};
