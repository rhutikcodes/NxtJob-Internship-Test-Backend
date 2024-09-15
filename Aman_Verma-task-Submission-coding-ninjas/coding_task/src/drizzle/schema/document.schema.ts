
import { mysqlTable, int, timestamp, varchar, bigint, mysqlEnum } from "drizzle-orm/mysql-core"
import { user } from "./user.schema";

export const document = mysqlTable("document", {
	id: int("id").primaryKey().autoincrement().notNull(),
	ownerId: int("owner_id").references(()=>user.id).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	url: varchar("url", { length: 255 }).notNull(),
	path: varchar("path", { length: 255 }).notNull(),
	fileType: varchar("file_type", { length: 50 }),
	size: bigint("size", { mode: "number" }),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
	description: varchar("description", {length: 255}),
	status: mysqlEnum("status", ['active','archived']).default('active'),
});
