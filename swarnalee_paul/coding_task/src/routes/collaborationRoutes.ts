import { Hono } from "hono";
import { addCollaborator } from "../controllers/collaborationController";

const collaborationRoutes = new Hono();

collaborationRoutes.post("/collaborators", addCollaborator);

export default collaborationRoutes;
