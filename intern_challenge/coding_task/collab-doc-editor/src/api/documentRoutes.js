import { Hono } from 'hono';
import * as documentController from '../controllers/documentController.js';

const documentRoutes = new Hono();

documentRoutes.post('/documents', documentController.createDocument);
documentRoutes.put('/documents/:id', documentController.updateDocument);
documentRoutes.delete('/documents/:id', documentController.deleteDocument);

export default documentRoutes;
