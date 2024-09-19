import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { createClerkClient } from "@clerk/clerk-sdk-node";


import {Env} from "./index"
import DocumentRepository from "./features/document/document.repository";
import ApplicationError from "./middleware/errorHandler";

const userConnections: Map<number, WebSocket[]> = new Map();

const Socket = new Hono<{Bindings:Env}>();

Socket.get("/", clerkMiddleware(), async (c) => {
	
	if (c.req.header('Upgrade') !== 'websocket') {
		return c.text('Expected a WebSocket request', 400);
	}
    

	const [client, server] = Object.values(new WebSocketPair());
    
	const auth = getAuth(c);
    
    if(!auth?.userId){
		throw new HTTPException(401, {message: "Unauthorized"});
	}

    const clerk = createClerkClient({secretKey: c.env.CLERK_SECRET_KEY});
    const user = await clerk.users.getUser(auth.userId);
    const userId = Number(user.externalId);

	server.accept();
    registerUserConnection(Number(userId), server);

    


	const sql = neon(c.env.DATABASE_URL);
	const db = drizzle(sql);

	server.addEventListener('message', async (event) => {

		let data = parseEventData(event);

		
		switch (data.message) {

            /**
             * {
				"message": "create",
                "name": "Coding"
				"content": "Coding is Fun"
			}
             */
			case 'create':
				if(!data.content){
					server.send("Content Missing");
					break;
				}else if(!data.name){
					server.send("Name of document required");
					break;
				}	
				try {
					const users = await DocumentRepository.create(userId, data.name, data.content, db);
					
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
					const users = await DocumentRepository.edit(userId, data.docId, data.content, db);
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
					await DocumentRepository.setPermission(userId, data.permitUser, data.docId, data.permission, db);	
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
					"docId": 9
				}
			 */

			case 'delete':
				if(!data.docId){
					server.send("Document Id missing");
					break;
				}
				try {
					await DocumentRepository.delete(userId, data.docId, db);
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
            
            case 'view':
                if(!data.docId){
                    server.send("Document Id missing");
                    break;
                }
                try {
                    const content = await DocumentRepository.view(userId, data.docId, db);
                    server.send(JSON.stringify(content));			
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
})





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

export default Socket;