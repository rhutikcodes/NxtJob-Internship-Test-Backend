import { Router } from "express";
import { createUser ,updateUser,deleteUser,fetchUsers} from "../Controller/UserController.js";

const router = Router()

router.post("/",createUser);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser)
router.get("/",fetchUsers)

export default router;