import { Hono } from "hono";
import ApplicationError from "../../middleware/errorHandler";
import { HTTPException } from "hono/http-exception";
import UserRepository from "./user.repository";
import { Env } from "../../index";
import { setCookie } from "hono/cookie";

const User = new Hono<{Bindings:Env}>();

User.post("/register", async (c)=>{
    try{
        const body = await c.req.parseBody();
        await UserRepository.register(body.email as string, body.password as string, body.username as string);
        return c.json({
        success: true,
        message: "New User created Successfull"
    })    
    }catch(err){
        if(err instanceof ApplicationError){
            throw new HTTPException(400, {message: err.message});
        }
        throw err;
    }
})

User.post("/login", async (c)=>{
    try{
        const body = await c.req.parseBody();
        // const token = await UserRepository.login(body.email as string, body.password as string);
        // setCookie(c, "token", token);
        return c.json({
            success: true,
            message: "New User created Successfull"
        })
    }catch(err){
        if(err instanceof ApplicationError){
            throw new HTTPException(400, {message: err.message});
        }
        throw err;
    }
})

export default User;