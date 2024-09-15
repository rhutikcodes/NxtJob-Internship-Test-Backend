import { NextFunction, Response } from "express";
import { AuthorizedRequest } from "../../types/authorizedRequest";
import path from "path";
import DocumentRepository from "./document.repository";
import { deleteFile } from "../../util/deleteFile";
import ApplicationError from "../../middleware/errorHandler";


export default class DocumentController{

    create = async (req:AuthorizedRequest, res:Response, next:NextFunction):Promise<void>=>{
        const userId = Number(req.user?.userId);
        const filename = req.file?.filename as string;
        const filePath = path.join("public", "files", filename)

        try {
            
            const data = {
              name: req.body.name as string,
              url: `document/view/${filename}`,
              path: filePath,
              fileType: req.file?.mimetype as string,
              size: req.file?.size as number,
              ownerId: userId,
              description: req.body.description as string
            }

            const record = await DocumentRepository.create(data);

            res.status(201).json({success:true, message: "New Document created", document: record});
            
        } catch (error) {
          deleteFile(filePath);
          next(error);
        }
    }

    edit = async (req:AuthorizedRequest, res:Response, next:NextFunction):Promise<void>=>{

        const filename = req.file?.filename as string;
        const filePath = path.join("public", "files", filename)

        try {
            const {docId, details} = req.body;
            const userId = Number(req.user?.userId);
            await DocumentRepository.edit(userId, docId, filePath, details, `document/view/${filename}`);
            res.status(201).json({success:true, message: `Document:${docId} edited by User:${userId}`});
        } catch (error) {
          deleteFile(filePath);
          next(error);  
        }
    }

    delete = async (req:AuthorizedRequest, res:Response, next:NextFunction):Promise<void>=>{
        try {
          console.log(req.user);
          
          const userId = Number(req.user?.userId);
          const docId = Number(req.params.docId);
          await DocumentRepository.delete(userId, docId);
          res.status(201).json({success:true, message: `Document:${docId} is deleted by User:${userId}`});
        } catch (error) {
          next(error);
        }
    }

    view = async (req:AuthorizedRequest, res:Response, next:NextFunction):Promise<void>=>{
      try {
        if(!req.query.docId){
          throw new ApplicationError(400, "Documnet Id must be passed a Query Parameter");
        }
        const userId = Number(req.user?.userId);
        const docId = Number(req.query.docId);
        await DocumentRepository.view(userId, docId);
        next();
      } catch (error) {
        next(error);
      }
    }

    setPermission = async (req:AuthorizedRequest, res:Response, next:NextFunction):Promise<void>=>{
      try {
        const owner = Number(req.user?.userId);
        const {docId, permission, userId} = req.query;
        await DocumentRepository.setPermission(owner, Number(userId), Number(docId), permission as string);
        res.status(201).json({success:true, message:`${permission} Access to Document:${docId} is given to user:${userId}`})
      } catch (error) {
        next(error);
      }
    }
}