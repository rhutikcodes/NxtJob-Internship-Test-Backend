import express, { NextFunction, Response } from "express";
import { upload } from "../../middleware/fileUpload";
import DocumentController from "./document.controller";
import path from "path";
import { AuthorizedRequest } from "../../types/authorizedRequest";


const DocumentRouter = express.Router();
const documentContoller = new DocumentController();
const filePath = path.join("public", "files");

DocumentRouter.post("/create", upload, documentContoller.create);
DocumentRouter.use("/view", documentContoller.view, (req:AuthorizedRequest)=>express.static("public/files"));
DocumentRouter.get("/set-permission", upload, documentContoller.setPermission);
DocumentRouter.patch("/edit", upload, documentContoller.edit);
DocumentRouter.delete("/:docId", documentContoller.delete);


export default DocumentRouter;