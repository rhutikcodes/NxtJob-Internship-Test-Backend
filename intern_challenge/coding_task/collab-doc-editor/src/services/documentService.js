import { prisma } from '../database/index.js';

export const documentService = {
	createDocument: async (title, content, userId) => {
		return await prisma.document.create({
			data: { title, content, userId },
		});
	},
	updateDocument: async (id, content) => {
		return await prisma.document.update({
			where: { id: Number(id) },
			data: { content },
		});
	},
	deleteDocument: async (id) => {
		return await prisma.document.delete({ where: { id: Number(id) } });
	},
};
