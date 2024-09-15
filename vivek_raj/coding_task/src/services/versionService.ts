import { createVersion, getVersions } from '../models/version.model';

// Save a new version of the document
export async function saveVersion(documentId: number, content: string, userId: number) {
  try {
    const newVersion = await createVersion(documentId, content, userId);
    return newVersion;
  } catch (error) {
    throw new Error('Could not save the document version.');
  }
}

// Get all versions of a document
export async function retrieveVersions(documentId: number) {
  try {
    const versions = await getVersions(documentId);
    return versions;
  } catch (error) {
    throw new Error('Could not retrieve document versions.');
  }
}
