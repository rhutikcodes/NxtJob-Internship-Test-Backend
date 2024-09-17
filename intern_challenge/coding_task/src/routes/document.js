import { Router } from 'hono';
import prisma from '../utils/db';

const documentRouter = new Router();

// Create a new document
documentRouter.post('/', async (ctx) => {
  const { title, content, ownerId } = await ctx.req.json();

  const document = await prisma.document.create({
    data: { title, content, ownerId },
  });

  ctx.json(document);
});

// Other document-related routes...

export default documentRouter;
