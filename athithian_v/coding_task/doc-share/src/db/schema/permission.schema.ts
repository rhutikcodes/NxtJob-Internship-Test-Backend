import { integer, pgEnum, pgTable, serial } from "drizzle-orm/pg-core"
import { user } from "./user.schema";
import { document } from "./document.schema";

export const permissionEnum = pgEnum("permit", ['view','edit'])


export const permission = pgTable("permission", {
	id: serial("id").primaryKey(),
	userId: integer("user_id").references(()=>user.id, { onDelete: 'cascade' }).notNull(),
	docId: integer("doc_id").references(()=>document.id, { onDelete: 'cascade' }).notNull(),
	permit: permissionEnum("permit"),
});