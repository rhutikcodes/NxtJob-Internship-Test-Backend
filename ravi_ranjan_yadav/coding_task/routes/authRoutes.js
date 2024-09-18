import { Hono } from "hono";

const authRoutes = new Hono();

authRoutes.post("/login", async (c) => {

  return c.json({ message: "Login route" });
});

authRoutes.post("/signup", async (c) => {

  return c.json({ message: "Signup route" });
});

export default authRoutes;