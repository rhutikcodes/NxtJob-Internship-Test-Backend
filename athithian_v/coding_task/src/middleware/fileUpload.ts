import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { AuthorizedRequest } from "../types/authorizedRequest";
import path from "path";

const storage = multer.diskStorage({
    destination: (req:Request, file, cb)=>{
        cb(null, 'public/files');
    },
    filename: (req:AuthorizedRequest, file, cb)=>{
        cb(null, `${file.originalname.split(".")[0]}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFormat = (req:Request, file:Express.Multer.File, cb:FileFilterCallback)=>{
    const fileTypes = /doc|docx|txt|pdf|xlsx/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if(extname && mimeType){
        return cb(null, true);
    }else{
        return cb(new Error("Only doc, docx, txt, pdf and xlsx types are allowed"));
    }
}


export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 *1024
    },
    fileFilter: fileFormat,
}).single("file");