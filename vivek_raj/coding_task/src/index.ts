import { Hono } from 'hono';
import { clerkMiddleware } from './middleware/clerk.js;
import { createDocument, updateDocument, deleteDocument } from './api/document';
import { saveVersion, getVersions } from './api/versions';
import { shareDocument } from './api/permissions';
import { handleWebSocketSession } from './sockets/websocket';

const app = new Hono();

// Apply Clerk authentication middleware
app.use('*', clerkMiddleware);

// Document routes
app.post('/document', createDocument);
app.put('/document/:id', updateDocument);
app.delete('/document/:id', deleteDocument);

// Version control routes
app.post('/document/:id/version', saveVersion);
app.get('/document/:id/versions', getVersions);

// Share document
app.post('/document/:id/share', shareDocument);

// WebSocket route
app.get('/ws', handleWebSocketSession);

export default app;
