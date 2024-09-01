import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const addCollaborator = async (
  documentId: string,
  userId: string,
  permission: "view" | "edit"
) => {
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

export const removeCollaborator = async (
  documentId: string,
  userId: string
) => {
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

export const getCollaborators = async (documentId: string) => {
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

export const checkPermission = async (
  documentId: string,
  userId: string,
  requiredPermission: "view" | "edit"
) => {
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

export const notifyCollaborators = async (documentId: string) => {
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
