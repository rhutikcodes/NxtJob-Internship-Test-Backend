export const documentService = {
	createDocument: async (title, content, userId) => {
		const query = `
            INSERT INTO documents (title, content, userId)
            VALUES (?, ?, ?)
        `;
		await DB.prepare(query).bind(title, content, userId).run();
		return { title, content, userId };
	},

	updateDocument: async (id, content) => {
		const query = `
            UPDATE documents
            SET content = ?
            WHERE id = ?
        `;
		await DB.prepare(query).bind(content, id).run();
		return { id, content };
	},

	deleteDocument: async (id) => {
		const query = `
            DELETE FROM documents
            WHERE id = ?
        `;
		await DB.prepare(query).bind(id).run();
		return { message: 'Document deleted' };
	},

	getDocuments: async (documentId) => {
		const query = `
            SELECT * FROM documents
            WHERE id = ?
        `;
		const { results } = await DB.prepare(query).bind(documentId).all();
		return results;
	},
};
