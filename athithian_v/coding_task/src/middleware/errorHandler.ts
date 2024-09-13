import { NextFunction, Request, Response } from "express";
import { errorLogger } from "../util/logger";

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

    errorLogger.error(err);
    console.log(err);

    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
        return;
    }

    res.status(500).send("Unknown error Occured");
}