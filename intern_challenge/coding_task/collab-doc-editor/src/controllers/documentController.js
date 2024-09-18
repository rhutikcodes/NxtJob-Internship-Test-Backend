import { documentService } from '../services/documentService.js';

export const createDocument = async (c) => {
	const { title, content } = c.req.json();
	const userId = c.req.auth.userId; // Assuming the middleware adds the user ID
	const document = await documentService.createDocument(title, content, userId);
	return c.json({ document });
};

export const updateDocument = async (c) => {
	const { id } = c.req.param();
	const { content } = c.req.json();
	const updatedDocument = await documentService.updateDocument(id, content);
	return c.json({ updatedDocument });
};

export const deleteDocument = async (c) => {
	const { id } = c.req.param();
	await documentService.deleteDocument(id);
	return c.json({ message: 'Document deleted' });
};
