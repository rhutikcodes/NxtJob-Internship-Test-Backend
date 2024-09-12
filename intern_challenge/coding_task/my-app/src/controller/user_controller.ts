import { clerkClient } from "@clerk/clerk-sdk-node";
import { PrismaClient } from "@prisma/client";
import { Context } from "hono";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const create = async (c: Context)=>{
    try{
        let {name, email, password} = await c.req.json();
        let user = await prisma.user.findUnique({where:{
            email: email
        }})

        if(user){
            return c.json({message: "user already exist!"}, 400)
        }

        user = await prisma.user.create({
            data:{
                name: name,
                email: email,
                password: password
            }
        })

        return c.json({message: "User registered success fully!"}, 201)
    }catch(error){
        console.log(error)
    }finally{
        await prisma.$disconnect();
    }
}

export const signin = async (c: Context)=>{
    try {
        const {email, password} = await c.req.json();
        let user = await prisma.user.findUnique({where:{
            email: email
        }})
        if(!user || user.password !== password){
            return c.json({message: "Password or email not correct"}, 400)
        }
        let token = jwt.sign(
            { id: user.id, email: user.email },  
            process.env.secretKey as string,     
            { expiresIn: "1h" }                  
        );        return c.json({message: "You have logged in successfully!", token},200)
    } catch (error) {
        console.log(error)
    }
}