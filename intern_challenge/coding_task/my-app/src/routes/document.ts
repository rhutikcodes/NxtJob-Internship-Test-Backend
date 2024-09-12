import { Hono } from "hono";
import { createDocument, updateDocument, deleteDocument } from "../controller/document_controller";
import { shareDocument } from "../controller/permission_controller";


export const documentRoutes = new Hono();

documentRoutes.post("/create", createDocument);
documentRoutes.put("/update", updateDocument);
documentRoutes.delete("/delete/:id", deleteDocument);
documentRoutes.post("/share", shareDocument);