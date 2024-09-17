import { Hono } from 'hono';
import documentRouter from './routes/document';
import versionRouter from './routes/versions';
import permissionsRouter from './routes/permissions';
import notificationsRouter from './routes/notifications';

const app = new Hono();

// Register routes
app.route('/api/documents', documentRouter);
app.route('/api/versions', versionRouter);
app.route('/api/permissions', permissionsRouter);
app.route('/api/notifications', notificationsRouter);

// Start the server
app.fire();

export default app;
