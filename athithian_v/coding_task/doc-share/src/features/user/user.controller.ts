import { Hono } from "hono";
import ApplicationError from "../../middleware/errorHandler";
import { HTTPException } from "hono/http-exception";
import { Env } from "../../index";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { createClerkClient, User } from "@clerk/clerk-sdk-node";
import { user } from "../../db/schema/user.schema";
import { eq } from "drizzle-orm";

const UserContoller = new Hono<{Bindings:Env}>();

UserContoller.post("/register", async (c)=>{
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

UserContoller.post("/login", async (c)=>{
    try{


        const {email, password} = await c.req.json();
        
        
        const clerk = createClerkClient({secretKey: c.env.CLERK_SECRET_KEY});

    
        const user = await clerk.users.getUserList({emailAddress: email});

        if(user.totalCount===0){
            throw new ApplicationError(400, "Email/Password Incorrect");
        }

        const userId = (user.data[0] as User).id;
        
        const passwordCheck = await clerk.users.verifyPassword({userId,password}).catch(err=>{
            if(err.errors[0].code === "incorrect_password"){
            throw new ApplicationError(400, "Email/Password Incorrect");
        }
        });

        const signIntoken = await clerk.signInTokens.createSignInToken({userId, expiresInSeconds: 24*60*60});



        return c.json({
            success: true,
            message: "User Logged In",
            signIntoken: signIntoken.token
        })
    }catch(err:any){
        
        if(err instanceof ApplicationError){
            throw new HTTPException(400, {message: err.message});
        }
        throw err;
    }
})

export default UserContoller;