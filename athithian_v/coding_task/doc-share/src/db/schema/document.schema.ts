
import { integer, timestamp, varchar, text, pgTable, serial } from "drizzle-orm/pg-core"
import { user } from "./user.schema";

export const document = pgTable("document", {
	id: serial("id").primaryKey(),
	createdBy: integer("created_By").references(()=>user.id, { onDelete: 'cascade' }).notNull(),
	content: text("content").notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow().$onUpdate(()=>new Date()),
	description: varchar("description", {length: 255}),
});