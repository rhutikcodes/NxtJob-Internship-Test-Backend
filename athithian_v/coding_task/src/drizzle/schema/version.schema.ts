
import { mysqlTable, int, timestamp, varchar } from "drizzle-orm/mysql-core"
import { document } from "./document.schema"

export const version = mysqlTable("Version", {
	id: int("id").primaryKey().autoincrement(),
	docId: int("doc_id").references(()=>document.id).notNull(),
	version: int("version").notNull().default(1),
	url: varchar("url", {length: 255}).notNull(),
	path: varchar("path", {length: 255}).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	description: varchar("description", {length: 255}),
  })