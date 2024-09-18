import { timestamp, varchar, pgTable, serial } from "drizzle-orm/pg-core"

export const user = pgTable("user", {
	id: serial("id").primaryKey(),
	username: varchar("username", { length: 255 }).unique(),
	email: varchar("email", {length: 255}).unique(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow().$onUpdate(()=>new Date()),
});