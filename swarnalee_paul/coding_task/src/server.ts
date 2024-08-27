import app from "./app";
import { createServer } from "http";

const server = createServer(app.handle);
server.listen(3002, () => {
  console.log("Server is running on port 3002");
});