import { Hono } from "hono";
import authRoutes from "./routes/authRoutes";
import documentRoutes from "./routes/documentRoutes";
import collaborationRoutes from "./routes/collaborationRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";


const app = new Hono();


app.use("/api", authMiddleware);
app.route("/api/auth", authRoutes);
app.route("/api/documents", documentRoutes);
app.route("/api/collaboration", collaborationRoutes);

export default app;
