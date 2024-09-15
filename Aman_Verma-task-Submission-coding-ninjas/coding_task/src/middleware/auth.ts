import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import ApplicationError from "./errorHandler";
import { AuthorizedRequest } from "./../types/authorizedRequest";

export const authenticate  = (req:AuthorizedRequest, res:Response, next:NextFunction)=>{
    const token = req.cookies.token || req.header('Authorization');
    

    if(!token){
        return res.status(400).send("<h1>Unauthorized, Log in to Continue</h1>");
    }

    const secretKey = process.env.SECRET_KEY;    

    try {
        if(!secretKey){
            throw new Error("Secret Key not added to environment variable");
        }
        jwt.verify(token, secretKey, (err:any, user:any)=>{            
            if(err){
                throw new ApplicationError(403, "Forbidden");
            }

            req.user = user;
        
            next();
        });


    } catch (error) {
        next(error);
    }

}