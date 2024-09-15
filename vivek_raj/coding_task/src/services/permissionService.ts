import { addCollaborator, getCollaborators, removeCollaborator } from '../models/collaborator.model';
import { CollaboratorRole } from '../models/collaborator.model';

// Share a document with a collaborator
export async function shareDocument(documentId: number, userId: number, role: CollaboratorRole) {
  try {
    const collaborator = await addCollaborator(documentId, userId, role);
    return collaborator;
  } catch (error) {
    throw new Error('Could not share the document.');
  }
}

// Get all collaborators for a document
export async function getDocumentCollaborators(documentId: number) {
  try {
    const collaborators = await getCollaborators(documentId);
    return collaborators;
  } catch (error) {
    throw new Error('Could not retrieve document collaborators.');
  }
}

// Remove a collaborator from the document
export async function revokeAccess(documentId: number, userId: number) {
  try {
    const result = await removeCollaborator(documentId, userId);
    return result;
  } catch (error) {
    throw new Error('Could not revoke access.');
  }
}
