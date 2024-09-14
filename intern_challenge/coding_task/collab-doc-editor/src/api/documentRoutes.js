import { documentService } from '../services/documentService.js';

export const createDocument = async (req, res) => {
	const { title, content } = req.body;
	const document = await documentService.createDocument(title, content, req.auth.userId);
	res.json({ document });
};

export const updateDocument = async (req, res) => {
	const { id } = req.params;
	const { content } = req.body;
	const updatedDocument = await documentService.updateDocument(id, content);
	res.json({ updatedDocument });
};

export const deleteDocument = async (req, res) => {
	const { id } = req.params;
	await documentService.deleteDocument(id);
	res.json({ message: 'Document deleted' });
};
