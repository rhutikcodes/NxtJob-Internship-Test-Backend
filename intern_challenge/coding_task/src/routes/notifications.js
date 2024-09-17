import { Router } from 'hono';
import prisma from '../utils/db';

const notificationsRouter = new Router();

// Create a notification
notificationsRouter.post('/', async (ctx) => {
  const { userId, message } = await ctx.req.json();

  const notification = await prisma.notification.create({
    data: {
      userId: parseInt(userId, 10),
      message,
    },
  });

  ctx.json(notification);
});

// Get all notifications for a user
notificationsRouter.get('/:userId', async (ctx) => {
  const { userId } = ctx.req.param();

  const notifications = await prisma.notification.findMany({
    where: {
      userId: parseInt(userId, 10),
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  ctx.json(notifications);
});

// Mark all notifications for a user as read (optional)
notificationsRouter.put('/:userId/mark-read', async (ctx) => {
  const { userId } = ctx.req.param();

  await prisma.notification.updateMany({
    where: {
      userId: parseInt(userId, 10),
    },
    data: {
      isRead: true,
    },
  });

  ctx.json({ message: 'Notifications marked as read' });
});

export default notificationsRouter;
