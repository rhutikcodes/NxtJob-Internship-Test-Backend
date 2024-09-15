// routes/documentRoutes.js
const express = require('express');
const documentController = require('../controllers/documentController');
const collaborationController = require('../controllers/collaborationController');

module.exports = (prisma) => {
  const router = express.Router();

  router.post('/', documentController.createDocument);
  router.put('/:id', collaborationController.checkPermissions, documentController.updateDocument);
  router.delete('/:id', documentController.deleteDocument);

  return router;
};
