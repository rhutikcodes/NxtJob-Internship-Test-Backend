import { versionService } from '../services/versionService.js';

export const createVersion = async (c) => {
	const { documentId, content } = c.req.json();
	const version = await versionService.createVersion(documentId, content);
	return c.json({ version });
};

export const getVersions = async (c) => {
	const { documentId } = c.req.param();
	const versions = await versionService.getVersions(documentId);
	return c.json({ versions });
};
