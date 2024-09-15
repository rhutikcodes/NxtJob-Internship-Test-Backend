import { NextFunction, Request, Response } from "express";
import { User } from "../../types/user";
import UserRepository from "./user.repository";

export default class UserController{
    
    register = async (req:Request, res:Response, next:NextFunction):Promise<void>=>{
        try {
            const data:User = req.body;
            const newUser = await UserRepository.register(data);
            res.status(201).json({success:true, message: `User with username: ${newUser.username} is created`, newUser});
        } catch (error) {
            next(error);
        }
    }

    login = async (req:Request, res:Response, next:NextFunction):Promise<void>=>{
        try {
            const email:string = req.body.email;
            const password:string = req.body.password;
            const token = await UserRepository.login(email, password);
            res.status(200).cookie("token", token, {secure:true, httpOnly: true, sameSite: "strict", maxAge: 3600000}).send(token);
        } catch (error) {
            next(error);
        }
    }
}