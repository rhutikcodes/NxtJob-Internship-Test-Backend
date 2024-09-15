import { createPool } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import dotenv from "dotenv";

dotenv.config();

// Create a pool of connections
const pool = createPool({
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT!),
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
});

// Initialize drizzle with the connection pool
export const db = drizzle(pool);