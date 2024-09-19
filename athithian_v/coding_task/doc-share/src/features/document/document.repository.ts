import { and, desc, eq } from "drizzle-orm";

import { document } from "../../db/schema/document.schema";
import { version } from "../../db/schema/version.schema";
import { permission } from "../../db/schema/permission.schema";

import ApplicationError from "../../middleware/errorHandler";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { user } from "../../db/schema/user.schema";



export default class DocumentRepository{

    static create = async (userId:number, name:string, content:string, db:NeonHttpDatabase<Record<string, never>>) =>{
        // Inserting new Document
        const record = await db.insert(document).values({
                createdBy: userId,
                name,
                content
            })
            .returning();
        
        // Creating version for the document.
        await db.insert(version)
        .values({ docId: record[0].id });
    }

    static edit = async (userId:number, docId:number, content:string, db:NeonHttpDatabase<Record<string, never>>)=> {
        try {

            
            const permit = await db.select({permission: permission.permit}).from(permission)
                .where(and(eq(permission.userId, userId), eq(permission.docId, docId)));
            
            const doc = await db.select({owner: document.createdBy, content: document.content}).from(document).where(eq(document.id, docId));
            
            if(doc.length===0){
                throw new ApplicationError(400, "Document Does not exists. Please check the document Id");
            }

            
            if(doc[0].owner!==userId && (permit.length===0 || permit[0].permission!=='edit')){
                throw new ApplicationError(400, `User:${userId} does not have permission to edit Document:${docId}`)
            }

            if(doc[0].content === content){
                throw new ApplicationError(400, `No changes made to document`);
            }

            await db.update(document).set({content}).where(eq(document.id, docId));

            const previousVersion = await db.select({version: version.versionNumber}).from(version)
                    .where(
                        eq(version.docId, docId)
                    )
                    .orderBy(desc(version.created_at))
                    .limit(1);

            await db.insert(version).values({docId, content, versionNumber: (previousVersion[0].version!+1)});

            const permittedUsers = await db.select({userId: permission.userId}).from(permission)
                .where(and(eq(permission.docId, docId), eq(permission.permit, "edit")));

            return permittedUsers;

        } catch (error) {
            throw error;   
        }
    }

    static delete = async (userId:number, docId:number, db:NeonHttpDatabase<Record<string, never>>) => {
        try {
            const doc = await db.select({owner: document.createdBy, content: document.content}).from(document).where(eq(document.id, docId));

            if(doc.length===0){
                throw new ApplicationError(400, "Document Does not exists. Please check the document Id");
            }


            if(doc[0].owner!==userId){
                throw new ApplicationError(400, `Only Owner of the document can delete the file`);
            }

            await db.delete(version).where(eq(version.docId, docId));
            await db.delete(document).where(eq(document.id, docId));

            
        } catch (error) {
            throw error;   
        }
    }


    static setPermission = async (owner:number, userId:number, docId:number, permit:string, db:NeonHttpDatabase<Record<string, never>>) => {

        const userExists = await db.select().from(user).where(eq(user.id, userId));
        console.log(userId);
        
        console.log(userExists);
        
        if(userExists.length===0){
            throw new ApplicationError(400, "User for whom permission to be set does not exists");
        }

        const doc = await db.select({owner: document.createdBy, content: document.content}).from(document).where(eq(document.id, docId));

        if(doc.length===0){
            throw new ApplicationError(400, "Document Does not exists. Please check the document Id");
        }

        if(doc[0].owner!==owner){
            throw new ApplicationError(400, "Only owner of the documnet can set Permission");
        }

        if(userId === owner){
            throw new ApplicationError(400, "Owner of the documnet cannot set Permission to himself/herself");
        }

        if(permit!=='edit' && permit!=='view'){
            throw new ApplicationError(400, "Invalid Input: Permission can either be 'edit' or 'view'")
        }

        const permissionRecord = await db
            .select()
            .from(permission)
            .where(
                and(
                    eq(permission.docId, docId),
                    eq(permission.userId, userId)
                )
            );

        if(permissionRecord.length!==0){
            if(permissionRecord[0].permit!==permit){
                await db.update(permission).set({permit: permit});
            }else{
                throw new ApplicationError(400, `User:${userId} already have ${permit} access to Document:${docId}`)
            }
        }else{
            await db.insert(permission).values({docId,userId,permit});
        }
    }
}