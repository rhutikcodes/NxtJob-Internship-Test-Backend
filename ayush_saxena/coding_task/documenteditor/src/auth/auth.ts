import { requireAuth } from "@clerk/express";
import { Context } from "hono";

// Clerk Authentication Middleware
export const authMiddleware = async (c: Context, next: () => Promise<void>) => {
  try {
    const { userId } = await requireAuth()(c.req.raw, c.res); // Using raw request/response

    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Attach user ID to the request context
    c.set('user', userId);
    await next();
  } catch (error: any) {
    console.error("Authentication error:", error.message, error.stack); // Log error with stack trace for debugging
    return c.json({ error: "Unauthorized", message: error.message }, 401);
  }
};

export default authMiddleware;