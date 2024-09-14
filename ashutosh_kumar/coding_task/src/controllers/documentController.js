const Document = require('../models/Document.js');
const DocumentVersion = require('../models/DocumentVersion.js');
const User = require('../models/userModel.js');
const nodemailer = require('nodemailer');

// Document creation
const createDocument = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id; // Assuming req.user has been set by the authenticate middleware

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }

    try {
        // Create the new document
        const document = await Document.create({
            title,
            content,
            userId // The user creating the document
        });

        res.status(201).json({ message: "Document created successfully", document });
    } catch (error) {
        console.error("Error creating document:", error.message);
        res.status(500).json({ message: "Error creating document" });
    }
};

// Document editing (with version control)
const editDocument = async (req, res) => {
    const { documentId } = req.params;
    const { title, content } = req.body;
    try {
        const document = await Document.findByPk(documentId);
        if (!document) return res.status(404).json({ message: 'Document not found' });

        // Create a new version of the document
        const versionCount = await DocumentVersion.count({ where: { documentId } });
        await DocumentVersion.create({ documentId, content, version: versionCount + 1 });

        // Update the document
        document.title = title;
        document.content = content;
        await document.save();
        res.json(document);
    } catch (err) {
        res.status(500).json({ message: 'Error editing document' });
    }
};

// Document deletion
const deleteDocument = async (req, res) => {
    const { documentId } = req.params;
    try {
        const document = await Document.findByPk(documentId);
        if (!document) return res.status(404).json({ message: 'Document not found' });

        await document.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting document' });
    }
};

// Share document with permissions
const shareDocument = async (req, res) => {
    const { documentId } = req.params;
    const { userId, permission } = req.body;
    try {
        const document = await Document.findByPk(documentId);
        if (!document) return res.status(404).json({ message: 'Document not found' });

        document.permissions[userId] = permission;
        await document.save();

        res.json({ message: 'Document shared successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error sharing document' });
    }
};

module.exports = { createDocument, editDocument, deleteDocument, shareDocument };