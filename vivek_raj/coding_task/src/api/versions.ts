import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Save a document version
export const saveVersion = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.auth.userId;

  const version = await prisma.version.create({
    data: {
      documentId: Number(id),
      content,
      createdById: userId,
    },
  });

  res.json(version);
};

// Get document versions
export const getVersions = async (req, res) => {
  const { id } = req.params;

  const versions = await prisma.version.findMany({
    where: { documentId: Number(id) },
    orderBy: { createdAt: 'desc' },
  });

  res.json(versions);
};
