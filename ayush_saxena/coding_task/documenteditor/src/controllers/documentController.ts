// import { db, documents, versions } from "../db/db";
// import { eq } from "drizzle-orm";

// export const createDocument = async (title: string, content: string, ownerId: number) => {
//     const result = await db.insert(documents).values({
//         title,
//         content,
//         ownerId
//     });
//     return result;
// };

// export const editDocument = async (id: number, content: string) => {
//     await db.update(documents).set({ content }).where(eq(documents.id, id));
// };

// export const getDocument = async (id: number) => {
//     const [document] = await db.select().from(documents).where(eq(documents.id, id)).limit(1);
//     return document;
// };

// export const saveVersion = async (documentId: number, content: string) => {
//     await db.insert(versions).values({
//         documentId,
//         content
//     });
// };


import { db, documents, versions } from "../db/db";
import { eq } from "drizzle-orm";

// Function to create a new document
export const createDocument = async (title: string, content: string, ownerId: number) => {
    const result = await db.insert(documents).values({
        title,
        content,
        ownerId
    });
    return result;
};

// Function to edit an existing document
export const editDocument = async (id: number, content: string) => {
    await db.update(documents)
        .set({ content })
        .where(eq(documents.id, id));
};

// Function to get a document by ID
export const getDocument = async (id: number) => {
    const [document] = await db.select()
        .from(documents)
        .where(eq(documents.id, id))
        .limit(1);
    return document;
};

// Function to save a version of a document
export const saveVersion = async (documentId: number, content: string) => {
    await db.insert(versions).values({
        documentId,
        content
    });
};
