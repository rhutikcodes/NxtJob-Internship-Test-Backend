import { serve } from '@hono/node-server'
import { Hono } from 'hono';
import {userRoutes} from "./routes/user"
import {documentRoutes} from "./routes/document"
import { setupWebSocketServer } from './config/websoket';
import http from "http";

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api/user", userRoutes)
app.route("/api/ document", documentRoutes)

const port = 3000
console.log(`Server is running on port ${port}`)

const server = http.createServer(app.fetch);

setupWebSocketServer(server);

serve({
  fetch: app.fetch,
  port
})
