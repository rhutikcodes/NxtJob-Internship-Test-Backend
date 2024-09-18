import { eq } from "drizzle-orm";
import db from "../../db/db";
import { user } from "../../db/schema/user.schema";
import ApplicationError from "../../middleware/errorHandler";
import clerk from "@clerk/clerk-sdk-node";

export default class UserRepository{

    static checkUser = async(userId:number)=>{
        const foundUser = await db.select({id:user.id}).from(user).where(eq(user.id, userId));

        if(foundUser.length<0){
            throw new ApplicationError(400, `User:${userId} Does not exists`);
        }

        return foundUser[0];
    }
    
    static register = async (email:string, password:string, username:string)=>{
        try {

            const client = clerk.createClerkClient({secretKey: process.env.CLERK_SECRET_KEY});

            
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
            
            const clerkUser = await client.users.createUser({
                emailAddress: [email],
                password: password,
                username,
                externalId: `${newUser[0].id}`
            });
            
            return record[0];
        } catch (error:any) {
            if (error.code === 'ER_DUP_ENTRY') {
                if (error.sqlMessage.includes('user_username_unique')) {
                  throw new ApplicationError(400, 'Username already exists');
                }
                else if (error.sqlMessage.includes('user_email_unique')) {
                  throw new ApplicationError(400, 'Email already exists');
                } 
                else {
                  throw new ApplicationError(400, 'Duplicate entry error');
                }
            }else{
                throw error;
            }
        }
    }

    // static login = async (email:string, password:string):Promise<string>=>{
    //     try {

    //         const client = clerk.createClerkClient({secretKey: process.env.CLERK_SECRET_KEY});

    //         const signIn = await createAllo;

    //         return token;
            
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}