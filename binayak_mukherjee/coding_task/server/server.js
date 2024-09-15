import dotenv from "dotenv"
dotenv.config();

import http from "http";

import express from "express";
import cors from "cors";
import { Server } from "socket.io";

import { connectToDB } from "./config/connectToDB.js";


const app = express();

app.use(cors());

const server = http.createServer(app);


//socket server configuration
//setup

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {

    console.log("connection made");

    socket.on("get-document", documentId => {

        const data = "";

        socket.join(documentId);

        socket.emit("load-document", data);


        socket.on("send-changes", delta => {

            //it will broadcast to all the client that connected to this socket server except us..
            console.log(delta);
            socket.broadcast.to(documentId).emit("receive-changes", delta);
        });

    });

    




    //for disconnection
    socket.on("disconnect", () => console.log("connection disconnected"));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    connectToDB();
    console.log(`server is running on port ${PORT}`);
});

