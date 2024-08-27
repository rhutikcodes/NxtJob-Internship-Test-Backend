import { Router } from "hono";
import { registerUser, loginUser } from "../controllers/authController";

const router = new Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
