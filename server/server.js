const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic routes
app.get('/', (req, res) => {
  res.json({ message: 'Risky Business Board Game Server' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Game state (in production, this should be a database)
let gameState = {
  players: [],
  currentPlayer: 0,
  gameStarted: false
};

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle player joining
  socket.on('joinGame', (playerData) => {
    console.log('Player joining:', playerData);
    // Add player to game state
    gameState.players.push({ id: socket.id, ...playerData });
    socket.emit('gameStateUpdate', gameState);
    socket.broadcast.emit('playerJoined', playerData);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    // Remove player from game state
    gameState.players = gameState.players.filter(player => player.id !== socket.id);
    socket.broadcast.emit('playerLeft', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
