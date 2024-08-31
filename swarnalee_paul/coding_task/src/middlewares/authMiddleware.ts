import { Context, Next } from "hono";

// Define the middleware function with types for the parameters
export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (authHeader) {
    console.log("Authorization header:", authHeader);
    await next(); // Call the next middleware or route handler
  } else {
    return new Response("Unauthorized", { status: 401 });
  }
};
