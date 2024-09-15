import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Version {
  id: number;
  documentId: number;
  content: string;
  createdAt: Date;
  createdById: number;
}

// Create a new version
export async function createVersion(documentId: number, content: string, userId: number) {
  return await prisma.version.create({
    data: {
      documentId,
      content,
      createdById: userId,
    },
  });
}

// Get all versions of a document
export async function getVersions(documentId: number) {
  return await prisma.version.findMany({
    where: { documentId },
    orderBy: { createdAt: 'desc' },
  });
}
