
import { pgTable, integer, timestamp, text, serial } from "drizzle-orm/pg-core"
import { document } from "./document.schema";

export const version = pgTable('version', {
  id: serial('id').primaryKey(),
  docId: integer('document_id').notNull().references(() => document.id, { onDelete: 'cascade' }),
  versionNumber: integer('version_number').default(1),
  content: text("content"),
  created_at: timestamp('created_at').defaultNow().notNull(),
  edited_by: integer('edited_by'),
});