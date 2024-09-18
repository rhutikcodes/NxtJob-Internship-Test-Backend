import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {config} from "dotenv";

config({
    path: '.dev.vars'
})


const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql);

export default db;