import { Router } from 'hono';
import prisma from '../utils/db';

const permissionsRouter = new Router();

// Add a collaborator to a document
permissionsRouter.post('/:documentId', async (ctx) => {
  const { documentId } = ctx.req.param();
  const { userId, permission } = await ctx.req.json();

  const collaborator = await prisma.collaborator.create({
    data: {
      documentId: parseInt(documentId, 10),
      userId: parseInt(userId, 10),
      permission,
    },
  });

  ctx.json(collaborator);
});

// Get all collaborators of a document
permissionsRouter.get('/:documentId', async (ctx) => {
  const { documentId } = ctx.req.param();

  const collaborators = await prisma.collaborator.findMany({
    where: {
      documentId: parseInt(documentId, 10),
    },
    include: {
      user: true,
    },
  });

  ctx.json(collaborators);
});

// Remove a collaborator from a document
permissionsRouter.delete('/:documentId/:userId', async (ctx) => {
  const { documentId, userId } = ctx.req.param();

  await prisma.collaborator.deleteMany({
    where: {
      documentId: parseInt(documentId, 10),
      userId: parseInt(userId, 10),
    },
  });

  ctx.json({ message: 'Collaborator removed successfully' });
});

export default permissionsRouter;
