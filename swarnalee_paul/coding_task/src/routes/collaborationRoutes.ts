import { Router } from "hono";
import { addCollaborator } from "../controllers/collaborationController";

const router = new Router();

router.post("/collaborators", addCollaborator);

export default router;
