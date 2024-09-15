import { mysqlTable, int, timestamp, varchar } from "drizzle-orm/mysql-core"
import { user } from "./user.schema";
import { document } from "./document.schema";
import { version } from "./version.schema";

export const change = mysqlTable("change", {
	id: int("id").primaryKey().autoincrement().notNull(),
	userId: int("user_id").references(()=>user.id).notNull(),
	docId: int("doc_id").references(()=>document.id).notNull(),
	versionId: int("version_id").references(()=>version.id),
	timestamp: timestamp("timestamp").defaultNow(),
	details: varchar("details", {length: 255}),
});