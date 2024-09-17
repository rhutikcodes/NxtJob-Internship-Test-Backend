import { Router } from 'hono';
import prisma from '../utils/db';

const versionRouter = new Router();

// Create a new version of a document
versionRouter.post('/:documentId', async (ctx) => {
  const { documentId } = ctx.req.param();
  const { content } = await ctx.req.json();

  const version = await prisma.version.create({
    data: {
      documentId: parseInt(documentId, 10),
      content,
    },
  });

  ctx.json(version);
});

// Get all versions of a document
versionRouter.get('/:documentId', async (ctx) => {
  const { documentId } = ctx.req.param();

  const versions = await prisma.version.findMany({
    where: {
      documentId: parseInt(documentId, 10),
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  ctx.json(versions);
});

export default versionRouter;
