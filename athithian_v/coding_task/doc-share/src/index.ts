import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import User from "./features/user/user.controller";
import DocumentRepository from "./features/document/document.repository";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { createClerkClient } from "@clerk/clerk-sdk-node";
import ApplicationError from "./middleware/errorHandler";
import authenticate from "./features/user/authentication";


export type Env = {
	DATABASE_URL: string,
	CLERK_PUBLISHABLE_KEY: string,
	CLERK_SECRET_KEY: string
}

const app = new Hono<{Bindings:Env}>();

app.get('/', (c) => {
	console.log();
	
	return c.json({
		message: "Welcome to DOC Share"
	})
})



app.route('/user', User);

const userConnections: Map<number, WebSocket[]> = new Map();

// For Registering user Connection
function registerUserConnection(userId: number, ws: WebSocket) {
  if (!userConnections.has(userId)) {
    userConnections.set(userId, []);
  }
  userConnections.get(userId)!.push(ws);
}

// Unregistering User connection
function unregisterUserConnection(ws: WebSocket) {
  for (const [userId, connections] of userConnections.entries()) {
    const index = connections.indexOf(ws);
    if (index !== -1) {
      connections.splice(index, 1); // Remove the WebSocket from the array
      
      // Remove user entry if no connections remain
      if (connections.length === 0) {
        userConnections.delete(userId);
      }
      break;
    }
  }
}

function parseEventData(event:MessageEvent){
	let data;
	if (typeof event.data === 'string') {
		data = JSON.parse(event.data);
	} else if (event.data instanceof ArrayBuffer) {
		const decoder = new TextDecoder();
		const decodedString = decoder.decode(event.data);
		data = JSON.parse(decodedString);
	}
	return data;
}

app.get('/ws', async (c) => {
	if (c.req.header('Upgrade') !== 'websocket') {
		return c.text('Expected a WebSocket request', 400);
	}

	const [client, server] = Object.values(new WebSocketPair());
	server.accept();


	const sql = neon(c.env.DATABASE_URL);
	const db = drizzle(sql);




	server.addEventListener('message', async (event) => {

		let data = parseEventData(event);
		
		const auth = await authenticate(data.token, c.env.CLERK_SECRET_KEY);
		console.log(auth);
		
		if(auth){
			registerUserConnection(data.userId, server);			
		}else{
			server.send(JSON.stringify({ type: 'error', message: 'UnAuthentication' }));
          	server.close();
			return;
		}

		
		switch (data.message) {

			case 'create':
				if(!data.content){
					server.send("Content Missing");
					break;
				}else if(!data.name){
					server.send("Name of document required");
					break;
				}	
				try {
					const users = await DocumentRepository.create(data.userId, data.name, data.content, db);
					
					server.send("New documnet created successfully");				
				} catch (error) {
					if(error instanceof ApplicationError){
						server.send(error.message);
					}
					else{
						server.send("Error occured while editing document")
					}
				}
				
				break;

			/*Example Socket message for edit
			{
				"message": "edit",
				"userId": 2,
				"docId": 9,
				"content": "Coding is Fun"
			}*/

			case 'edit':
				if(!data.docId){
					server.send("Document Id missing");
					break;
				}else if(!data.content){
					server.send("Content Missing");
					break;
				}
				try {
					const users = await DocumentRepository.edit(data.userId, data.docId, data.content, db);
					users.forEach(user=>{
						const websockets = userConnections.get(user.userId);
						websockets?.forEach(ws=>{
							ws.send(JSON.stringify({docId: data.docId, userId: data.userId, message: "User made Changes in the document"}))
						})
					})	
					server.send("Successfully Edited");				
				} catch (error) {
					if(error instanceof ApplicationError){
						server.send(error.message);
					}
					else{
						server.send("Error occured while editing document")
					}
				}
				
				break;

				/**
				 * Example Socket Message for Set Permission:
				 * {
						"message": "set-permission",
						"userId": 2,
						"permitUser": 9,
						"docId": 9,
						"permission": "edit"
					}
				 */

			case 'set-permission':
				if(!data.docId){
					server.send("Document Id missing");
					break;
				}else if(!data.permission){
					server.send("Permission Missing. Specify Permission - Edit, View");
					break;
				}else if(!data.permitUser){
					server.send("Specify the user Id of the user to whom permission must set");
					break;
				}
				try {
					await DocumentRepository.setPermission(data.userId, data.permitUser, data.docId, data.permission, db);	
					server.send(`${data.permission} permission is set to  user:${data.permitUser}`);			
				} catch (error) {
					if(error instanceof ApplicationError){
						server.send(error.message);
					}
					else{
						server.send("Error occured while editing document")
					}
				}
				
				break;

			/**
			 * Example socket message for delete:
			 * {
					"message": "delete",
					"userId": 2,
					"docId": 9
				}
			 */

			case 'delete':
				if(!data.docId){
					server.send("Document Id missing");
					break;
				}
				try {
					await DocumentRepository.delete(data.userId, data.docId, db);
					server.send(`Document:${data.docId} is successfully deleted`);			
				} catch (error) {
					if(error instanceof ApplicationError){
						server.send(error.message);
					}
					else{
						server.send("Error occured while editing document")
					}
				}
				
				break;
		
			default:
				server.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
				break;
		}
	})

		
	server.addEventListener('close', () => { 		
		unregisterUserConnection(server);
		console.log('WebSocket connection closed');
	});

	// Return a WebSocket response
	return new Response(null, { status: 101, webSocket: client });
});


app.onError((err, c) => {
	console.log(err);

	if (err instanceof HTTPException) {
		return err.getResponse()
	}

	return new Response('An unexpected error occurred', { status: 500 });
})

export default app;