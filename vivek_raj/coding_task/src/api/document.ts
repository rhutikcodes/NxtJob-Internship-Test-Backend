import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new document
export const createDocument = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.auth.userId;

  const newDocument = await prisma.document.create({
    data: { title, content, ownerId: userId },
  });

  res.json(newDocument);
};

// Edit a document
export const updateDocument = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const updatedDocument = await prisma.document.update({
    where: { id: Number(id) },
    data: { content },
  });

  res.json(updatedDocument);
};

// Delete a document
export const deleteDocument = async (req, res) => {
  const { id } = req.params;

  await prisma.document.delete({
    where: { id: Number(id) },
  });

  res.json({ success: true });
};
