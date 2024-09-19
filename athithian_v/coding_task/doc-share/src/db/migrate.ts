import { migrate } from "drizzle-orm/neon-http/migrator";
import db from "./db";

const main = async () => {
    try {
        await migrate(db, {
            migrationsFolder: 'drizzle',
        });
        console.log("Migration Successful");
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();