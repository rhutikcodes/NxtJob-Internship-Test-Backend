import { versionService } from '../services/versionService.js';

export const createVersion = async (req, res) => {
	const { documentId, content } = req.body;
	const version = await versionService.createVersion(documentId, content);
	res.json({ version });
};

export const getVersions = async (req, res) => {
	const { documentId } = req.params;
	const versions = await versionService.getVersions(documentId);
	res.json({ versions });
};
