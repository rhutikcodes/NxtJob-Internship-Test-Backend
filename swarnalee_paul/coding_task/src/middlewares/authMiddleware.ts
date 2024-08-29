import { Hono } from "hono";

export const authMiddleware = async (c, next) => {
  
  const { req, res } = c;

  
  const authHeader = req.headers.get("Authorization");

  if (authHeader) {
   
    console.log("Authorization header:", authHeader);

   
    await next();
  } else {
   
    return new Response("Unauthorized", { status: 401 });
  }
};
