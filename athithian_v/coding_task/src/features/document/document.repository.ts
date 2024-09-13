import { and, desc, eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { document } from "../../drizzle/schema/document.schema";
import { version } from "../../drizzle/schema/version.schema";
import { permission } from "../../drizzle/schema/permission.schema";
import ApplicationError from "../../middleware/errorHandler";
import { change } from "../../drizzle/schema/change.schema";
import { deleteFile } from "../../util/deleteFile";
import UserRepository from "../user/user.repository";

type Document = {
    name: string;
    url: string;
    fileType: string;
    size: number;
    ownerId: number;
    description: string;
}

export default class DocumentRepository{

    private static checkDoc = async(docId:number)=>{
        const doc = await db.select({id:document.id, owner:document.ownerId}).from(document).where(eq(document.id, docId));

        if(doc.length<0){
            throw new ApplicationError(400, `Document:${docId} Does not exists`);
        }

        return doc;
    }

    static create = async (data:Document) => {
        try {
            await db.transaction(async (tx)=>{
                const record = await tx
                    .insert(document)
                    .values(data)
                    .$returningId();

                await tx.insert(version)
                        .values(
                            {
                                docId: record[0].id, 
                                url: data.url
                            }
                        );

                const doc = tx.select()
                    .from(document)
                    .where(
                        eq(document.id, record[0].id)
                    );

                return doc;
            })
        } catch (error) {
            throw error;   
        }
    }

    static edit = async (userId:number, docId:number, url:string, details:string):Promise<void>=> {
        try {

            await this.checkDoc(docId);

            if (!details) {
                throw new ApplicationError(400, 'Invalid input: details are missing');
            }

            const permit = await db
                .select({permission: permission.permission})
                .from(permission)
                .where(
                    and(
                        eq(permission.userId, userId),
                        eq(permission.docId, docId)
                    )
                );

            if(permit.length===0 || permit[0].permission!=='edit'){
                throw new ApplicationError(400, `User:${userId} is not allowed to edit Document:${docId}`)
            }

            await db.transaction(async (tx)=>{
                await tx.
                    update(document)
                    .set({url})
                    .where(eq(document.id, docId))
                
                const previousVersion = await tx
                    .select({version: version.version})
                    .from(version)
                    .where(
                        eq(version.docId, docId)
                    )
                    .orderBy(desc(version.createdAt))
                    .limit(1);
                
                const newVersionNumber = previousVersion.length>0 ?previousVersion[0].version+1 :1;

                const newVerions = await tx
                    .insert(version)
                    .values({docId, url, version: newVersionNumber}).$returningId();

                await tx
                    .insert(change)
                    .values({userId, docId, versionId:newVerions[0].id, details});
            },
            {
                isolationLevel: "serializable", //Ensures transaction to execute serially one after other.
                accessMode: "read write",
                withConsistentSnapshot: true,
            }
        )
        } catch (error) {
            throw error;   
        }
    }

    static delete = async (userId:number, docId:number) => {
        try {
            const doc:{id:number, owner:number}[] = await this.checkDoc(docId);

            if(doc[0].owner!==userId){
                throw new ApplicationError(400, `User:${userId} is not the owner of Documnet:${docId}`)
            }

            const urls = await db.select({url: version.url}).from(version).where(eq(version.docId, docId));

            await db.transaction(async (tx)=>{
                await tx.delete(document).where(eq(document.id, docId));
                await tx.delete(version).where(eq(version.docId, docId));
                await tx.delete(change).where(eq(change.docId, docId));
            },
            {
                isolationLevel: "serializable",
                accessMode: "read write",
                withConsistentSnapshot: true
            }
        );

            await Promise.all(urls.map(url=>deleteFile(url.url)));
        } catch (error) {
            throw error;   
        }
    }

    static view = async (userId:number, docId:number):Promise<boolean>=>{
        await this.checkDoc(docId);

        const permit = await db
                .select({permission: permission.permission})
                .from(permission)
                .where(
                    and(
                        eq(permission.userId, userId),
                        eq(permission.docId, docId)
                    )
                );

        if(permit.length===0){
            throw new ApplicationError(400, `User:${userId} is not allowed to view Document:${docId}`);
        }

        return true;
    }

    static setPermission = async (owner:number, userId:number, docId:number, permit:string) => {

        await UserRepository.checkUser(userId);
        const doc = await this.checkDoc(docId);

        if(doc[0].owner!==owner){
            throw new ApplicationError(400, "Only owner of the documnet can set Permission");
        }

        if(permit!=='edit' && permit!=='view'){
            throw new ApplicationError(400, "Invalid Input: Permission can either be 'edit' or 'view'")
        }

        await db.insert(permission).values({docId,userId,permission: permit});
    }
}