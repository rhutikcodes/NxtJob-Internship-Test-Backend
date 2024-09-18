import { Hono } from "hono";
import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentsRoutes.js";
import collaborationRoutes from "./routes/collaborationRoutes.js";
import { authMiddleware } from "./middleware/auth.js";


const app = new Hono();


app.use("/api", authMiddleware);
app.route("/api/auth", authRoutes);
app.route("/api/documents", documentRoutes);
app.route("/api/collaboration", collaborationRoutes);

export default app;