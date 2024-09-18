const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addCollaborator = async (documentId, userId, permission) => {
  try {
    const collaboration = await prisma.collaboration.create({
      data: {
        documentId,
        userId,
        permission,
      },
    });
    return collaboration;
  } catch (error) {
    throw new Error(`Unable to add collaborator: ${error.message}`);
  }
};

const removeCollaborator = async (documentId, userId) => {
  try {
    await prisma.collaboration.deleteMany({
      where: {
        documentId,
        userId,
      },
    });
    return { message: "Collaborator removed successfully" };
  } catch (error) {
    throw new Error(`Unable to remove collaborator: ${error.message}`);
  }
};

const getCollaborators = async (documentId) => {
  try {
    const collaborators = await prisma.collaboration.findMany({
      where: {
        documentId,
      },
      include: {
        user: true,
      },
    });
    return collaborators;
  } catch (error) {
    throw new Error(`Unable to get collaborators: ${error.message}`);
  }
};

const checkPermission = async (documentId, userId, requiredPermission) => {
  try {
    const collaboration = await prisma.collaboration.findFirst({
      where: {
        documentId,
        userId,
      },
    });

    if (!collaboration) {
      throw new Error("User does not have access to this document");
    }

    if (requiredPermission === "edit" && collaboration.permission !== "edit") {
      throw new Error("User does not have permission to edit this document");
    }

    return true;
  } catch (error) {
    throw new Error(`Permission check failed: ${error.message}`);
  }
};

const notifyCollaborators = async (documentId) => {
  try {
    const collaborators = await getCollaborators(documentId);

    collaborators.forEach((collaborator) => {
      console.log(
        `Notification: Document ${documentId} has been updated. Notifying user ${collaborator.userId}.`
      );
    });

    return { message: "Collaborators notified" };
  } catch (error) {
    throw new Error(`Unable to notify collaborators: ${error.message}`);
  }
};

module.exports = {
  addCollaborator,
  removeCollaborator,
  getCollaborators,
  checkPermission,
  notifyCollaborators,
};
