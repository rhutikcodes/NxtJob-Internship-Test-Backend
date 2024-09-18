// controllers/documentController.js
const documentModel = require('../models/documentModel');

const createDocument = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.auth.sessionClaims;

  try {
    const document = await documentModel.createDocument(title, content, userId);
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDocument = async (req, res) => {
  const documentId = Number(req.params.id);
  const { content } = req.body;

  try {
    const updatedDocument = await documentModel.updateDocument(documentId, content);
    res.json(updatedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDocument = async (req, res) => {
  const documentId = Number(req.params.id);

  try {
    await documentModel.deleteDocument(documentId);
    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDocument,
  updateDocument,
  deleteDocument
};
