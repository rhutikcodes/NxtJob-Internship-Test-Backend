
import { mysqlTable, int, mysqlEnum } from "drizzle-orm/mysql-core"
import { user } from "./user.schema";
import { document } from "./document.schema";

export const permission = mysqlTable("permission", {
	id: int("id").primaryKey().autoincrement().notNull(),
	userId: int("user_id").references(()=>user.id).notNull(),
	docId: int("doc_id").references(()=>document.id).notNull(),
	permission: mysqlEnum("permission", ['view','edit']).default('view'),
});
