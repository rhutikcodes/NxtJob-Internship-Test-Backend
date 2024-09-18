import { Hono } from 'hono';

export const permissionRoutes = (prisma) => {
  const app = new Hono();

  // Share a document with another user
  app.post('/share', async (c) => {
    const { documentId, userId, access } = await c.req.json();

    const permission = await prisma.permission.create({
      data: {
        documentId,
        userId,
        access,
      },
    });

    return c.json(permission);
  });

  // Get permissions for a document
  app.get('/:documentId', async (c) => {
    const { documentId } = c.req.param();
    const permissions = await prisma.permission.findMany({
      where: { documentId },
    });

    return c.json(permissions);
  });

  return app;
};
