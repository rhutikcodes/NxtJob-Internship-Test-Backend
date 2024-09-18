import { Hono } from "hono";
import { addCollaborator } from "../controller/collaborationController.js";

const collaborationRoutes = new Hono();

collaborationRoutes.post("/collaborators", async (c) => {
  const { documentId, userId, permission } = await c.req.json();
  if (!documentId || !userId || !permission) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  try {
    const result = await addCollaborator(documentId, userId, permission);
    return c.json(result);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

export default collaborationRoutes;
