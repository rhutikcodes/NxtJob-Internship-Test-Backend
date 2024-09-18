// controllers/collaborationController.js
const collaboratorModel = require('../models/collaboratorModel');

const addCollaborator = async (req, res) => {
  const documentId = Number(req.params.id);
  const { userId, permission } = req.body;

  try {
    const collaborator = await collaboratorModel.addCollaborator(documentId, userId, permission);
    res.json(collaborator);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkPermissions = async (req, res, next) => {
  const documentId = Number(req.params.id);
  const { userId } = req.auth.sessionClaims;

  try {
    const collaborator = await collaboratorModel.findCollaborator(documentId, userId);
    if (!collaborator || collaborator.permission !== 'edit') {
      return res.status(403).json({ error: 'You do not have permission to edit this document' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCollaborator,
  checkPermissions
};
