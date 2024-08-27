import { Request, Response } from "hono";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addCollaborator = async (req: Request, res: Response) => {
  const { documentId, userId, accessType } = req.body;
  try {
    const permission = await prisma.permission.create({
      data: { documentId, userId, accessType },
    });
    res.status(201).json(permission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
