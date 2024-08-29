import { Context } from "hono";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createDocument = async (c: Context) => {
  
  const body = await c.req.json();
  const { title, content, ownerId } = body;

  try {
    const document = await prisma.document.create({
      data: { title, content, ownerId },
    });
    return c.json(document, 201); 
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400); 
  }
};

export const updateDocument = async (c: Context) => {
 
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const { title, content } = body;

  try {
    const document = await prisma.document.update({
      where: { id },
      data: { title, content },
    });
    return c.json(document, 200); 
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400); 
  }
};

export const deleteDocument = async (c: Context) => {
  
  const id = Number(c.req.param("id"));

  try {
    await prisma.document.delete({ where: { id } });
    return c.json({ message: "Document deleted" }, 200); 
  } catch (error) {
    return c.json({ error: (error as Error).message }, 400); 
  }
};
