import { requireAuth } from "@clerk/express";
import { Context } from "hono";
export const authMiddleware = async (c: Context, next: () => Promise<void>) => {
    try {
        const { uId } = await requireAuth()(c.req.raw, c.res);
        if (!uId) {
            return c.json({ error: "Unauthorized" }, 401);
        }
        // Attach uID to the request context
        c.set('user', uId);
        await next();
    } catch (error: any) {
        console.error("Authentication error:", error.message, error.stack);
        return c.json({ error: "Unauthorized", message: error.message }, 401);
    }
};
export default authMiddleware;