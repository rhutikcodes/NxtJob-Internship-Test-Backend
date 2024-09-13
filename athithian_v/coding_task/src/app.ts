import express from "express";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middleware/errorHandler";
import UserRouter from "./features/user/user.routes";
import swagger from "./../public/swagger.json";
import { authenticate } from "./middleware/auth";
import DocumentRouter from "./features/document/document.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swagger));
app.use("/user", UserRouter);
app.use("/document", authenticate, DocumentRouter);

app.use(errorHandler);

export default app;