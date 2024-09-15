import { Hono } from "hono";
import { createDocument, editDocument, getDocument, saveVersion } from "../controllers/documentController";
import authMiddleware from "../auth/auth";

const app = new Hono();

app.use(authMiddleware);

app.post('/documents', async (c) => {
    const { title, content } = await c.req.json();
  
    // Assuming user ID is stored in a specific key (e.g., c.userId)
    const ownerId = (c as any).userId; // Type casting (avoid if possible)
  
    if (!ownerId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
  
    const doc = await createDocument(title, content, Number(ownerId));
    return c.json(doc);
  });

app.get('/documents/:id', async (c) => {
    const id = Number(c.req.param("id"));
    const doc = await getDocument(id);
    return c.json(doc);
});

app.put('/documents/:id', async (c) => {
    const id = Number(c.req.param("id"));
    const { content } = await c.req.json();
    await editDocument(id, content);
    await saveVersion(id, content);
    return c.json({ success: true });
});

export default app;
