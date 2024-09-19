import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {config} from "dotenv";

config({
    path: '.dev.vars'
})

let db;
if(process.env.DATABASE_URL){
    const sql = neon(process.env.DATABASE_URL!);
    db = drizzle(sql);
}


export default db;