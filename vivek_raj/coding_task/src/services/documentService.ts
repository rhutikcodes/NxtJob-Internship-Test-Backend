import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Document {
  id: number;
  title: string;
  content: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Create a new document
export async function createDocument(title: string, content: string, ownerId: number) {
  return await prisma.document.create({
    data: {
      title,
      content,
      ownerId,
    },
  });
}

// Get a document by ID
export async function getDocumentById(documentId: number) {
  return await prisma.document.findUnique({
    where: { id: documentId },
  });
}

// Update a document's content
export async function updateDocument(documentId: number, content: string) {
  return await prisma.document.update({
    where: { id: documentId },
    data: { content },
  });
}

// Delete a document
export async function deleteDocument(documentId: number) {
  return await prisma.document.delete({
    where: { id: documentId },
  });
}

// Get all documents owned by a user
export async function getDocumentsByUser(userId: number) {
  return await prisma.document.findMany({
    where: { ownerId: userId },
  });
}
