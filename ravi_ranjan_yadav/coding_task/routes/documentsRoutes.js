import { Hono } from 'hono';

export const documentRoutes = (prisma) => {
  const app = new Hono();

  // Create new document
  app.post('/', async (c) => {
    const { title, content } = await c.req.json();
    const userId = c.req.auth.userId;

    const document = await prisma.document.create({
      data: {
        title,
        content,
        ownerId: userId,
      },
    });

    return c.json(document);
  });

  // Get all documents for a user
  app.get('/', async (c) => {
    const userId = c.req.auth.userId;
    const documents = await prisma.document.findMany({
      where: { ownerId: userId },
    });

    return c.json(documents);
  });

  // Get single document
  app.get('/:id', async (c) => {
    const { id } = c.req.param();
    const document = await prisma.document.findUnique({
      where: { id },
    });

    return document ? c.json(document) : c.json({ error: 'Document not found' }, 404);
  });

  // Update document (and increment version)
  app.put('/:id', async (c) => {
    const { id } = c.req.param();
    const { content } = await c.req.json();

    const updatedDoc = await prisma.document.update({
      where: { id },
      data: {
        content,
        version: { increment: 1 },
      },
    });

    return c.json(updatedDoc);
  });

  // Delete document
  app.delete('/:id', async (c) => {
    const { id } = c.req.param();
    await prisma.document.delete({
      where: { id },
    });

    return c.json({ message: 'Document deleted successfully' });
  });

  return app;
};
