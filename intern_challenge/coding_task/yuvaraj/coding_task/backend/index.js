import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// configure the .env file.
dotenv.config({ path: "./.env" })

const app = express();

// Allow requests all from origins
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());


export default app;