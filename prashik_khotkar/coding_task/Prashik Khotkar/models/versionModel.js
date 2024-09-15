// models/versionModel.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createVersion = async (documentId, changes) => {
  return prisma.version.create({
    data: {
      documentId,
      changes
    }
  });
};

module.exports = {
  createVersion
};
