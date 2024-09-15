// import { mysqlTable, serial, varchar, text, int, datetime } from "drizzle-orm/mysql-core";
// import { drizzle } from "drizzle-orm/mysql2";
// import mysql from "mysql2/promise";

// // Define the tables
// export const users = mysqlTable("users", {
//     id: serial("id").primaryKey(),
//     email: varchar("email", { length: 255 }).notNull(),
//     username: varchar("username", { length: 100 }).notNull(),
// });

// export const documents = mysqlTable("documents", {
//     id: serial("id").primaryKey(),
//     title: varchar("title", { length: 255 }).notNull(),
//     content: text("content"),
//     ownerId: int("ownerId").notNull(),
// });

// export const versions = mysqlTable("versions", {
//     id: serial("id").primaryKey(),
//     documentId: int("documentId").notNull(),
//     content: text("content").notNull(),
//     createdAt: datetime("createdAt").default(new Date()),  // Use JavaScript Date object as default
// });

// // Initialize the MySQL connection pool
// const connection = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
// });

// // Initialize the Drizzle ORM connection using the 'mysql2' adapter
// export const db = drizzle(connection);


import { mysqlTable, serial, varchar, text, int, datetime } from "drizzle-orm/mysql-core";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// Define the tables
export const users = mysqlTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    username: varchar("username", { length: 100 }).notNull(),
});

export const documents = mysqlTable("documents", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content"),
    ownerId: int("ownerId").notNull(),
});

export const versions = mysqlTable("versions", {
    id: serial("id").primaryKey(),
    documentId: int("documentId").notNull(),
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

// Initialize the Drizzle ORM connection using the 'mysql2' adapter
export const db = drizzle(connection);
