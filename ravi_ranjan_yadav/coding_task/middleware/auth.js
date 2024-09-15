import { withAuth } from '@clerk/clerk-sdk-node';

export const authMiddleware = async (c, next) => {
  try {
    const authHeader = c.req.headers.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const auth = await withAuth(token);
    c.req.auth = { userId: auth.userId };

    await next();
  } catch (error) {
    return c.json({ error: 'Authentication failed' }, 401);
  }
};
