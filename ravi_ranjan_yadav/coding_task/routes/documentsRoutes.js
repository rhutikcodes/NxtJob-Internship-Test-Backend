import { Hono } from "hono";
import {
  createDocument,
  updateDocument,
  deleteDocument,
} from "../controller/documentController.js";

const documentRoutes = new Hono();

// Define routes directly on the Hono instance
documentRoutes.post("/documents", createDocument);
documentRoutes.put("/documents/:id", updateDocument);
documentRoutes.delete("/documents/:id", deleteDocument);

export default documentRoutes;