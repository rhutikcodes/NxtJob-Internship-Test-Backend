import { PrismaClient } from "@prisma/client";
import { Context } from "hono";

const prisma = new PrismaClient();

export const createDocument = async (c: Context) => {
  try {
    const { title, content, ownerId } = await c.req.json();
    
    const newDocument = await prisma.document.create({
      data: {
        title,
        content,
        ownerId
      }
    });

    return c.json(newDocument, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to create document" }, 500);
  } finally {
    await prisma.$disconnect();
  }
};

export const updateDocument = async (c: Context) => {
  try {
    const { id, content } = await c.req.json();

    const updatedDocument = await prisma.document.update({
      where: { id },
      data: { content },
    });

    // Create new version for version control
    await prisma.documentVersion.create({
      data: {
        content,
        documentId: id,
      },
    });

    return c.json(updatedDocument, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to update document" }, 500);
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteDocument = async (c: Context) => {
  try {
    const { id } = c.req.param("id");

    await prisma.document.delete({
      where: { id: parseInt(id) },
    });

    return c.json({ message: "Document deleted" }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to delete document" }, 500);
  } finally {
    await prisma.$disconnect();
  }
};
