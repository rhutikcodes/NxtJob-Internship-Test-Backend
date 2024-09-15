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
        origin: "*",
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {

    console.log("connection made");

    //for disconnection
    socket.on("disconnect", () => console.log("connection disconnected"));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    connectToDB();
    console.log(`server is running on port ${PORT}`);
});

