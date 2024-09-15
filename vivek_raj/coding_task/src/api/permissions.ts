import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Share document with collaborators
export const shareDocument = async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req.body;

  const collaborator = await prisma.collaborator.create({
    data: {
      documentId: Number(id),
      userId,
      role,
    },
  });

  res.json(collaborator);
};

// Enforce permissions when editing
export const enforcePermissions = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.auth.userId;

  const collaborator = await prisma.collaborator.findFirst({
    where: { documentId: Number(id), userId },
  });

  if (!collaborator || collaborator.role !== 'EDITOR') {
    return res.status(403).json({ error: 'Permission denied' });
  }

  next();
};
