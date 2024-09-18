import { Hono } from 'hono';
import * as versionController from '../controllers/versionController.js';

const versionRoutes = new Hono();

versionRoutes.post('/versions', versionController.createVersion);
versionRoutes.get('/versions/:documentId', versionController.getVersions);

export default versionRoutes;
