import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import router from "./src/user/routes/user.routes.js";
import { errorHandleMiddleware, handleUncaughtError } from "./middleware/errorHandleMiddleware.js";

// Configure the .env file.
dotenv.config({ path: "./.env" })

const app = express();

// Allow requests all from origins
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());

// Configure the routes.
app.use("/api/user", router);

// Default path.
app.get("/", (req, res) => {
    res.status(200).send("Welcome to our login server.");
});

// Error handle middleware.
app.use(errorHandleMiddleware);

// 404 API handler
app.use((req, res) => {
    console.log(handleUncaughtError());
    res.status(503).send("You are in invalid API route");
});

export default app;