import { PrismaClient } from '@prisma/client';
import { Hono } from 'hono';

export const userRoutes = (prisma) => {
  const app = new Hono();

  // Get current user
  app.get('/me', async (c) => {
    const userId = c.req.auth.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user ? c.json(user) : c.json({ error: 'User not found' }, 404);
  });

  // Register new user
  app.post('/register', async (c) => {
    const { email, name } = await c.req.json();
    const user = await prisma.user.create({
      data: { email, name },
    });

    return c.json(user);
  });

  return app;
};
