import { Hono } from "hono";
import ApplicationError from "../../middleware/errorHandler";
import { HTTPException } from "hono/http-exception";
import { Env } from "../../index";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { createClerkClient } from "@clerk/clerk-sdk-node";
import { user } from "../../db/schema/user.schema";
import { eq } from "drizzle-orm";

const User = new Hono<{Bindings:Env}>();

User.post("/register", async (c)=>{
    try{
        const {email, password, username} = await c.req.json();

        const sql = neon(c.env.DATABASE_URL);
        const db = drizzle(sql);

        const newUser = await db.insert(user).values({email, username}).returning();
            const record = await db
                                .select(
                                    {
                                        id: user.id, 
                                        email: user.email, 
                                        username: user.username,
                                    })
                                .from(user)
                                .where(eq(user.id, newUser[0].id));
        
                                console.log(newUser);
                                

        const clerk = createClerkClient({secretKey: c.env.CLERK_SECRET_KEY});

        const clerkUser = await clerk.users.createUser({
                emailAddress: [email],
                password: password,
                username,
                externalId: `${newUser[0].id}`
            });

        return c.json({
        success: true,
        message: "New User created Successfull"
    })    
    }catch(err:any){
        if (err.constraint.includes('user_username_unique')) {
            throw new HTTPException(400, {message: 'Username already exists. Please Choose another username'});
        }
        else if (err.constraint.includes('user_email_unique')) {
            throw new HTTPException(400, {message: 'Email already exists.'});
        } 
        else{
            throw err;
        }
    }
})

User.post("/login", async (c)=>{
    try{


        const {email, password} = await c.req.json();
        
        
        const clerk = createClerkClient({secretKey: c.env.CLERK_SECRET_KEY});
        const user = await clerk.users.getUserList({emailAddress: email});

        console.log(user);
        

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