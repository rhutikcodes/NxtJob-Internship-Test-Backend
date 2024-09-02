import { Router } from "express";
import userRouters from "./userRouters.js"

const router = Router()

router.use("/api/user",userRouters);

export default router