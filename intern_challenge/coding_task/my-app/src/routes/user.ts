import {Hono} from "hono";
import { create, signin } from "../controller/user_controller";

export const userRoutes = new Hono();

userRoutes.post("/create", create);
userRoutes.post("/signin", signin)

