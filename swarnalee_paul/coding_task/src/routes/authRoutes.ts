 //import { Router } from "hono";
// import { registerUser, loginUser } from "../controllers/authController";

// const router = new Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// export default router;


import { Hono } from "hono";

const authRoutes = new Hono();

authRoutes.post("/login", async (c) => {

  return c.json({ message: "Login route" });
});

authRoutes.post("/signup", async (c) => {

  return c.json({ message: "Signup route" });
});

export default authRoutes;
