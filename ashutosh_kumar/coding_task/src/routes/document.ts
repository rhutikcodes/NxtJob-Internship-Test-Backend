import { Hono } from "hono";
import { createDocument, editDocument, getDocument, saveVersion } from "../controllers/document"; // Import controller functions
// import authMiddleware from "../middleware/auth";

const app = new Hono();

// Middleware to protect routes
// app.use('*', async (c, next) => {
//     // const authResult = await authMiddleware(c, next);
//     if (!authResult) {
//         return c.json({ error: 'Unauthorized' }, 401);
//     }
//     await next();
// });

// Route to create a document
app.post('/documents', async (c) => {
    const { title, content } = await c.req.json();

    // Assuming the authenticated userId is added by middleware
    const ownerId = Number(c.req.param('uId'));

    if (!ownerId) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    try {
        const doc = await createDocument(title, content, Number(ownerId));
        return c.json(doc);
    } catch (error) {
        return c.json({ error: 'Error creating document' }, 500);
    }
});

// Route to get a document by ID
app.get('/documents/:id', async (c) => {
    const id = Number(c.req.param("id"));

    try {
        const doc = await getDocument(id);
        if (!doc) {
            return c.json({ error: 'Document not found' }, 404);
        }
        return c.json(doc);
    } catch (error) {
        return c.json({ error: 'Error retrieving document' }, 500);
    }
});

// Route to edit a document and save version
app.put('/documents/:id', async (c) => {
    const id = Number(c.req.param("id"));
    const { title } = await c.req.json();
    const { content } = await c.req.json();

    try {
        await editDocument(id, title, content);
        await saveVersion(id, title, content);
        return c.json({ success: true });
    } catch (error) {
        return c.json({ error: 'Error updating document' }, 500);
    }
});

export default app;
