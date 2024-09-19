import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import User from "./features/user/user.controller";
import Socket from "./socket";
import { cors } from "hono/cors";


export type Env = {
	DATABASE_URL: string,
	CLERK_PUBLISHABLE_KEY: string,
	CLERK_SECRET_KEY: string,
	CLERK_JWT_KEY: string
}

const app = new Hono<{Bindings:Env}>();

app.get('/', (c) => {
	return c.json({
		message: "Welcome to DOC Share"
	})
})


app.use("/", cors());
app.route('/user', User);
app.route('/ws', Socket);


app.onError((err, c) => {
	console.log(err);

	if (err instanceof HTTPException) {
		return err.getResponse()
	}

	return new Response('An unexpected error occurred', { status: 500 });
})

export default app;