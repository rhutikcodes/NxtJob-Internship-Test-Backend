// models/collaboratorModel.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addCollaborator = async (documentId, userId, permission) => {
  return prisma.collaborator.create({
    data: {
      documentId,
      userId,
      permission
    }
  });
};

const findCollaborator = async (documentId, userId) => {
  return prisma.collaborator.findFirst({
    where: { documentId, userId }
  });
};

module.exports = {
  addCollaborator,
  findCollaborator
};
