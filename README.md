# Risky-Business-Board-Game

An interactive and fun digital board game for 18+ inspired by real-life challenges, packed with mini-games and social interactions.

## Project Structure

```
Risky-Business-Board-Game/
├── client/                 # React frontend application
│   ├── public/            # Static assets and HTML template
│   │   └── index.html     # Main HTML template
│   ├── package.json       # Client dependencies and scripts
│   └── src/               # React source code (to be added)
├── server/                # Node.js Express backend
│   ├── package.json       # Server dependencies and scripts
│   └── server.js          # Main server file with Express and Socket.IO
├── .gitignore            # Git ignore file
and README.md             # This file
```

## Technology Stack

### Frontend (Client)
- **React** - UI framework
- **React DOM** - DOM rendering
- **React Scripts** - Development tools and build configuration
- **Web Vitals** - Performance monitoring

### Backend (Server)
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.IO** - Real-time communication
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development tool for auto-restart

## Prerequisites

- Node.js (version 16 or higher)
- npm (Node Package Manager)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/saadx200327/Risky-Business-Board-Game.git
cd Risky-Business-Board-Game
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Install Client Dependencies
```bash
cd ../client
npm install
```

### 4. Start the Development Environment

#### Option A: Run Both Servers Separately

**Start the backend server (Terminal 1):**
```bash
cd server
npm run dev
```
The server will start on `http://localhost:5000`

**Start the React frontend (Terminal 2):**
```bash
cd client
npm start
```
The client will start on `http://localhost:3000`

#### Option B: Production Mode

**Start the backend server:**
```bash
cd server
npm start
```

## API Endpoints

- `GET /` - Server status and welcome message
- `GET /api/health` - Health check endpoint

## Socket.IO Events

- `connection` - New client connected
- `joinGame` - Player joins the game
- `disconnect` - Client disconnected
- `playerJoined` - Broadcast when a player joins
- `playerLeft` - Broadcast when a player leaves
- `gameStateUpdate` - Game state synchronization

## Development Notes

- The React development server runs on port 3000
- The Express server runs on port 5000
- The client has a proxy configuration to forward API requests to the server
- Socket.IO is configured to allow connections from the React dev server

## Next Steps

1. Complete the React frontend components
2. Add game logic and state management
3. Implement board game mechanics
4. Add mini-games and social features
5. Add database integration (MongoDB/PostgreSQL)
6. Implement user authentication
7. Deploy to production environment

## Contributing

This is a board game project for 18+ users focusing on real-life challenges and social interactions.

## License

MIT License - see the LICENSE file for details.
