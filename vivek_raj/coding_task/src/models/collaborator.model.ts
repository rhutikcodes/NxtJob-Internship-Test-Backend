import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export enum CollaboratorRole {
  VIEWER = 'VIEWER',
  EDITOR = 'EDITOR',
}

export interface Collaborator {
  id: number;
  documentId: number;
  userId: number;
  role: CollaboratorRole;
}

// Add a collaborator to a document
export async function addCollaborator(documentId: number, userId: number, role: CollaboratorRole) {
  return await prisma.collaborator.create({
    data: {
      documentId,
      userId,
      role,
    },
  });
}

// Get collaborators of a document
export async function getCollaborators(documentId: number) {
  return await prisma.collaborator.findMany({
    where: { documentId },
  });
}

// Remove a collaborator from a document
export async function removeCollaborator(documentId: number, userId: number) {
  return await prisma.collaborator.deleteMany({
    where: {
      documentId,
      userId,
    },
  });
}
