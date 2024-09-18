import { Hono } from 'hono';
import { authMiddleware } from './middlewares/authMiddleware.js';
import authRoutes from './api/authRoutes.js';
import documentRoutes from './api/documentRoutes.js';
import versionRoutes from './api/versionRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = new Hono();

// Apply middleware
app.use('*', authMiddleware);

// Use route files
app.use(authRoutes);
app.use(documentRoutes);
app.use(versionRoutes);

// Default route
app.get('/', (c) => c.text('Hello, world!'));

export default app;
