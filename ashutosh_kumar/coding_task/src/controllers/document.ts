import { dbConnection, users, documents, docVersions } from "../config/db";
import { eq } from "drizzle-orm";

// Function to create a new document
export const createDocument = async (title: string, content: string, ownerId: number) => {
    try {
        const result = await dbConnection.insert(documents).values({
            title,
            content,
            ownerId
        });
        return result;
    } catch (error) {
        console.error("Error creating document:", error);
        throw new Error("Failed to create document");
    }
};

// Function to edit an existing document
export const editDocument = async (id: number, title: string, content: string) => {
    try {
        await dbConnection.update(documents)
            .set({ title, content })
            .where(eq(documents.id, id));
    } catch (error) {
        console.error("Error editing document:", error);
        throw new Error("Failed to edit document");
    }
};


// Function to get a document by ID
export const getDocument = async (id: number) => {
    try {
        const [document] = await dbConnection.select()
            .from(documents)
            .where(eq(documents.id, id))
            .limit(1);
        return document;
    } catch (error) {
        console.error("Error retrieving document:", error);
        throw new Error("Failed to get document");
    }
};

// Function to save a version of a document
export const saveVersion = async (documentId: number, title: string, content: string) => {
    try {
        await dbConnection.insert(docVersions).values({
            documentId,
            title,
            content
        });
    } catch (error) {
        console.error("Error saving document version:", error);
        throw new Error("Failed to save document version");
    }
};
