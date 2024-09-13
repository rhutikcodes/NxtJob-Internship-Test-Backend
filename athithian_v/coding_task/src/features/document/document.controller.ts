import { NextFunction, Response } from "express";
import { AuthorizedRequest } from "../../types/authorizedRequest";
import path from "path";
import DocumentRepository from "./document.repository";
import { deleteFile } from "../../util/deleteFile";


export default class DocumentController{

    create = async (req:AuthorizedRequest, res:Response, next:NextFunction):Promise<void>=>{
        const userId = Number(req.user?.userId);
        const filePath = path.join("public", "files", req.file?.originalname as string);
        try {

            const data = {
              name: req.body.name as string,
              url: filePath,
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
            const filePath = path.join("public", "files", req.file?.originalname as string);
        try {
            const {docId, details} = req.body;
            const userId = Number(req.user?.userId);
            await DocumentRepository.edit(userId, docId, filePath, details);
            res.status(201).json({success:true, message: `Document:${docId} edited by User:${userId}`});
        } catch (error) {
          deleteFile(filePath);
          next(error);  
        }
    }

    delete = async (req:AuthorizedRequest, res:Response, next:NextFunction):Promise<void>=>{
        try {
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
        const userId = Number(req.user?.userId);
        const docId = Number(req.params.docId);
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
        next();
      } catch (error) {
        next(error);
      }
    }
}