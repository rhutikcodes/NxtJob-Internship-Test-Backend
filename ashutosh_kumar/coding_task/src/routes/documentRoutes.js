// src/routes/documentRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js')
const {
    createDocument,
    editDocument,
    deleteDocument,
    shareDocument
} = require('../controllers/documentController.js');

const router = express.Router();

// Route to create a new document (protected route)
router.post('/documents', authMiddleware, createDocument);

// Route to edit a document (protected route)
router.put('/documents/:documentId', authMiddleware, editDocument);

// Route to delete a document (protected route)
router.delete('/documents/:documentId', authMiddleware, deleteDocument);

// Route to share a document with permissions (protected route)
router.post('/documents/:documentId/share', authMiddleware, shareDocument);

module.exports = router;
