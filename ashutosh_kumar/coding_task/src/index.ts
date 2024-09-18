import { Hono } from "hono";
import authMiddleware from "./middleware/auth";
import documentRoutes from "./routes/document";


const app = new Hono();

// Use Clerk Authentication Middleware
app.use(authMiddleware);

// Use Document Routes
app.route('/api', documentRoutes);

// Start WebSocket Server for real-time collaboration


app.fire();