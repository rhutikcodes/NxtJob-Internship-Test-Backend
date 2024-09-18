// models/documentModel.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createDocument = async (title, content, ownerId) => {
  return prisma.document.create({
    data: {
      title,
      content,
      ownerId
    }
  });
};

const updateDocument = async (id, content) => {
  return prisma.document.update({
    where: { id },
    data: { content }
  });
};

const deleteDocument = async (id) => {
  return prisma.document.delete({ where: { id } });
};

module.exports = {
  createDocument,
  updateDocument,
  deleteDocument
};
