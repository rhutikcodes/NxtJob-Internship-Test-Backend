import app from "./app";
import dotenv from "dotenv";
import { createLogDirectory } from "./util/createlogs";

dotenv.config();


const port = process.env.PORT || 3000;


async function main(){
    app.listen(port, async ()=>{
        console.log(`Server is listening at Port: ${port}`);
        createLogDirectory();
    });
}

main();

