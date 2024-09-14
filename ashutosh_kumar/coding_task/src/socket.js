
const { Server } = require('socket.io');

const configureSockets = (server) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('User connected');

        socket.on('joinDocument', (documentId) => {
            socket.join(documentId);
        });

        socket.on('editDocument', (documentId, content) => {
            socket.to(documentId).emit('documentUpdated', content);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

module.exports = configureSockets;
