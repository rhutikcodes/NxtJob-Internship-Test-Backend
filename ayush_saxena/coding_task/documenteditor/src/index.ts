// /**
//  * Welcome to Cloudflare Workers! This is your first worker.
//  *
//  * - Run `npm run dev` in your terminal to start a development server
//  * - Open a browser tab at http://localhost:8787/ to see your worker in action
//  * - Run `npm run deploy` to publish your worker
//  *
//  * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
//  * `Env` object can be regenerated with `npm run cf-typegen`.
//  *
//  * Learn more at https://developers.cloudflare.com/workers/
//  */

// export default {
// 	async fetch(request, env, ctx): Promise<Response> {
// 		return new Response('Hello World!');
// 	},
// } satisfies ExportedHandler<Env>;
import { Hono } from "hono";
import authMiddleware from "./auth/auth";
import documentRoutes from "./routes/documentRoutes";
import wss from "./websocket/websocket";

const app = new Hono();

// Use Clerk Authentication Middleware
app.use(authMiddleware);

// Use Document Routes
app.route('/api', documentRoutes);

// Start WebSocket Server for real-time collaboration
wss;

app.fire();
