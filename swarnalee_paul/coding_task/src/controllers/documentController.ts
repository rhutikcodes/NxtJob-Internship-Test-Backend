import { Request, Response } from "hono";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createDocument = async (req: Request, res: Response) => {
  const { title, content, ownerId } = req.body;
  try {
    const document = await prisma.document.create({
      data: { title, content, ownerId },
    });
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateDocument = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const document = await prisma.document.update({
      where: { id: Number(id) },
      data: { title, content },
    });
    res.status(200).json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteDocument = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.document.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Document deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
