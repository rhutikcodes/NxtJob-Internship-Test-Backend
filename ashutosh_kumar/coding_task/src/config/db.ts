import { mysqlTable, serial, varchar, text, int, datetime } from "drizzle-orm/mysql-core";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

// User Table
const users = mysqlTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    name: varchar("name", { length: 70 }).notNull(),
    createdAt: datetime("createdAt").default(new Date()),
});

// Documents Table
const documents = mysqlTable("documents", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content"),
    ownerId: int("ownerId").notNull(),
    createdAt: datetime("createdAt").default(new Date()),
});

// Document Versions Table
const docVersions = mysqlTable("docVersions", {
    id: serial("id").primaryKey(),
    documentId: int("documentId").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    createdAt: datetime("createdAt").default(new Date()),
});

// Initialize the MySQL connection pool
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

const dbConnection = drizzle(connection);

// Export the database connection and tables
export { dbConnection, users, documents, docVersions };
