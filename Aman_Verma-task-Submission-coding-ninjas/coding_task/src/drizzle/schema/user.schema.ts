import { mysqlTable, int, timestamp, varchar } from "drizzle-orm/mysql-core"

export const user = mysqlTable("user", {
	id: int("id").primaryKey().autoincrement().notNull(),
	username: varchar("username", { length: 255 }).unique(),
	email: varchar("email", {length: 255}).unique(),
	password: varchar("password", {length: 255}),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});