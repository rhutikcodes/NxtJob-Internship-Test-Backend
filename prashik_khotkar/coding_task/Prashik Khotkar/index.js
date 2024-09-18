const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const documentRoutes = require('./routes/documentRoutes');
const collaborationRoutes = require('./routes/collaborationRoutes');
const websocketService = require('./services/websocketService');
const clerkMiddleware = require('./utils/clerkMiddleware');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(clerkMiddleware); 

app.use('/api/documents', documentRoutes(prisma));
app.use('/api/collaborations', collaborationRoutes(prisma));

// Initialize WebSocket server
websocketService(prisma);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
