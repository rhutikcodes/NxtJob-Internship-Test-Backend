import { Router } from "hono";
import {
  createDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/documentController";

const router = new Router();

router.post("/documents", createDocument);
router.put("/documents/:id", updateDocument);
router.delete("/documents/:id", deleteDocument);

export default router;
