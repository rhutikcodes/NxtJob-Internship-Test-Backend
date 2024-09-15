// routes/collaborationRoutes.js
const express = require('express');
const collaborationController = require('../controllers/collaborationController');

module.exports = (prisma) => {
  const router = express.Router();

  router.post('/:id/collaborator', collaborationController.addCollaborator);

  return router;
};
