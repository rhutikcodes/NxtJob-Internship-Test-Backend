export const versionService = {
	createVersion: async (documentId, content) => {
		const query = `
            INSERT INTO versions (documentId, content, timestamp)
            VALUES (?, ?, ?)
        `;
		await DB.prepare(query).bind(documentId, content, new Date().toISOString()).run();
		return { documentId, content };
	},

	getVersions: async (documentId) => {
		const query = `
            SELECT * FROM versions
            WHERE documentId = ?
            ORDER BY timestamp DESC
        `;
		const { results } = await DB.prepare(query).bind(documentId).all();
		return results;
	},
};
