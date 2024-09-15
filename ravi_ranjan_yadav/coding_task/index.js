import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { serveStatic } from 'hono/serve-static';  // Ensure correct import
import { userRoutes } from './routes/userRoutes.js';
import { documentRoutes } from './routes/documentsRoutes.js';
import { permissionRoutes } from './routes/permissionRoutes.js';
import { setupWebSocketServer } from './websockets/collaborations.js';
import { authMiddleware } from './middleware/auth.js';
import { cors } from 'hono/cors';
import { config } from 'dotenv';

// Load environment variables
config();  

// Initialize Hono app and Prisma client
const app = new Hono();
const prisma = new PrismaClient();

// Set up CORS and static files serving
app.use('*', cors());
app.use('/static/*', serveStatic({ root: './public' }));

// Middleware to use Clerk authentication
app.use('*', authMiddleware);

// Routes
app.route('/users', userRoutes(prisma));
app.route('/documents', documentRoutes(prisma));
app.route('/permissions', permissionRoutes(prisma));

// WebSocket setup for real-time collaboration
setupWebSocketServer(app);

// Start the server
app.fire();
