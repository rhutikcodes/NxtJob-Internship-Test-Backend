import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "../../drizzle/db";
import { user } from "../../drizzle/schema/user.schema";
import { User } from "../../types/user";
import ApplicationError from "../../middleware/errorHandler";

export default class UserRepository{

    static checkUser = async(docId:number)=>{
        const doc = await db.select({id:user.id}).from(user).where(eq(user.id, docId));

        if(doc.length<0){
            throw new ApplicationError(400, `User:${docId} Does not exists`);
        }

        return doc;
    }
    
    static register = async (data:User):Promise<User>=>{
        try {
            if(!data.password || !data.email || !data.username){
                throw new ApplicationError(400, "Missing Email/Username/Password");
            }
            data.password = await bcrypt.hash(data.password, 12);
            const newUser = await db.insert(user).values(data).$returningId();
            const record = await db
                                .select(
                                    {
                                        id: user.id, 
                                        email: user.email, 
                                        username: user.username,
                                    })
                                .from(user)
                                .where(eq(user.id, newUser[0].id));
            
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

    static login = async (email:string, password:string):Promise<string>=>{
        try {

            const secretKey:string|undefined = process.env.SECRET_KEY;

            if(!secretKey){
                throw new Error("Secret Key not specified in .evn");
            }

            const record = await db.select().from(user).where(eq(user.email, email));
            if(record.length<=0){
                throw new ApplicationError(400, "Wrong Username/Password");
            }
            
            const userRecord = record[0];
            
            
            const passwordCheck = await bcrypt.compare(password, userRecord.password as string);

            if(!passwordCheck){
                throw new ApplicationError(400, "Wrong Username/Password");
            }

            const token = jwt.sign(
                {
                    userId: userRecord.id, 
                    username: userRecord.id, 
                    email: userRecord.email
                }, 
                secretKey,
                {
                    expiresIn: "1h"
                }
            )

            return token;
            
        } catch (error) {
            throw error;
        }
    }
}