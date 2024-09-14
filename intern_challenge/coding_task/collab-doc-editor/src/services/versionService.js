import { prisma } from '../database/index.js';

export const versionService = {
	createVersion: async (documentId, content) => {
		return await prisma.version.create({
			data: { documentId, content, timestamp: new Date() },
		});
	},
	getVersions: async (documentId) => {
		return await prisma.version.findMany({
			where: { documentId: Number(documentId) },
			orderBy: { timestamp: 'desc' },
		});
	},
};
