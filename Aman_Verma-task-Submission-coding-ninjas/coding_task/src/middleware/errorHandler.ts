import { NextFunction, Request, Response } from "express";
import { consoleLogger, errorLogger } from "../util/logger";

export default class ApplicationError extends Error{
    code:number;
    constructor(code:number, message:string){
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, ApplicationError.prototype);
        this.name = "ApplicationError";
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {


    if(err instanceof ApplicationError){    
        errorLogger.error(err.message);   
        res.status(err.code).json({success: false, message: err.message});
    }else{
        errorLogger.error(err.stack);
        consoleLogger.error(err.stack);
        res.status(500).json({success: false, message: "Unknown error Occured"});
    }
}