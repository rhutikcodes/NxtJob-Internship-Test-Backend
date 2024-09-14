import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
	console.log('A new client connected');

	ws.on('message', (message) => {
		// Broadcast the message to all connected clients
		wss.clients.forEach((client) => {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	});

	ws.on('close', () => {
		console.log('Client disconnected');
	});
});

export default wss;
