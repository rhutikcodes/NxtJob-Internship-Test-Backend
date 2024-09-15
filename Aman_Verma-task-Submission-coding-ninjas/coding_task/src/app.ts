import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middleware/errorHandler";
import UserRouter from "./features/user/user.routes";
import swagger from "./../public/swagger.json";
import { authenticate } from "./middleware/auth";
import DocumentRouter from "./features/document/document.routes";
import { logger } from "./util/logger";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req:Request, res:Response, next:NextFunction)=>{
    logger.info("Incoming Request: "+req.method+":"+req.url)
    next();
})

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swagger));
app.use("/user", UserRouter);
app.use("/document", authenticate, DocumentRouter);

app.use(errorHandler);
app.use("", (req:Request, res:Response)=>{
    res.status(400).json({success:false, message:"API does not Exists: Visit - http://localhost:3000/api-doc"})
})

export default app;