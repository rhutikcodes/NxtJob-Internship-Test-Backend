import app from "./app";
import dotenv from "dotenv";
import { createLogDirectory } from "./util/createlogs";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();


const port = process.env.PORT || 3000;

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket)=>{
    console.log(socket.id);
});

server.listen(port, async ()=>{
    console.log(`Server is listening at Port: ${port}`);
    createLogDirectory();
});

