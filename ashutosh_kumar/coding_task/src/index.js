const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const authRoutes = require('./routes/authRoutes.js');
const documentRoutes = require('./routes/documentRoutes.js');
const protectedRoutes = require('./routes/protectedRoutes.js');
const sequelize = require('../src/config/sequelize.js');
const configureSockets = require('./socket.js');

dotenv.config(); // Load environment variables

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Use authentication routes
app.use('/auth', authRoutes);


// Use protected routes
// app.use('/api', protectedRoutes);

app.use('/api', documentRoutes);


// WebSocket
configureSockets(server);

sequelize.sync({ force: false }) // Change 'force: false' to 'force: true' to recreate tables (for development purposes)
    .then(() => {
        console.log('Database synced');
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err.message);
    });