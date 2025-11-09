# Socket.IO Implementation Guide

## Overview
This project now includes full WebSocket support using Socket.IO for real-time multiplayer gaming functionality.

## Backend Setup

### Files Created/Modified:
1. **backend/index.js** - Updated to use HTTP server with Socket.IO
2. **backend/socket/socketHandler.js** - Socket.IO event handlers and game room management

### Key Features:
- Real-time multiplayer Connect 4 game
- Game room management
- Player join/leave notifications
- Chat functionality
- Online player count tracking

### Socket Events (Server):

#### Client → Server:
- `join-game` - Join a game room
- `make-move` - Make a move in Connect 4
- `reset-game` - Reset the game board
- `leave-game` - Leave a game room
- `chat-message` - Send a chat message
- `get-online-count` - Get total online players

#### Server → Client:
- `game-state` - Initial game state when joining
- `game-update` - Game state update after a move
- `game-reset` - Game reset confirmation
- `player-joined` - Notification when player joins
- `player-left` - Notification when player leaves
- `chat-message` - Receive chat message
- `online-count` - Total online players count
- `error` - Error messages

## Frontend Setup

### Files Created/Modified:
1. **frontend/src/context/SocketContext.jsx** - Socket.IO context provider
2. **frontend/src/pages/Connect4.jsx** - Updated with multiplayer support
3. **frontend/src/components/Navbar.jsx** - Added online status indicator
4. **frontend/src/main.jsx** - Added SocketProvider to app

### Dependencies:
- `socket.io-client` - Installed in frontend

### Key Features:
- Socket.IO context for global socket access
- Multiplayer Connect 4 with room creation/joining
- Real-time chat in multiplayer games
- Online status indicator in navbar
- Single-player mode (original functionality preserved)

## Usage

### Starting the Server:
```bash
cd backend
npm run dev
```

### Starting the Frontend:
```bash
cd frontend
npm run dev
```

### Playing Multiplayer Connect 4:

1. **Create a Room:**
   - Navigate to `/games/CONN-4`
   - Click "Create Room"
   - Share the room ID with another player

2. **Join a Room:**
   - Click "Join Room"
   - Enter the room ID shared by the host

3. **Game Features:**
   - Real-time board updates
   - Turn-based gameplay
   - Chat with opponent
   - Score tracking
   - Winner announcements

### Environment Variables:

**Backend (.env):**
```
PORT=3000
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env):**
```
VITE_API_BASE_URL=http://localhost:3000
```

## Game Room Structure

Each game room stores:
- `players[]` - Array of connected players
- `board[][]` - 6x7 Connect 4 board
- `currentTurn` - 'R' or 'Y'
- `winner` - Winner color or null
- `scores` - Object with R and Y scores

## Socket.IO Configuration

### CORS Settings:
- Origin: `http://localhost:5173` (development)
- Credentials: Enabled
- Transports: WebSocket, Polling

### Connection:
- Auto-connects on app load
- Reconnects automatically on disconnect
- Shows connection status in navbar

## Future Enhancements

Potential additions:
- Spectator mode
- Game history/replay
- Leaderboards integration
- Tournament mode
- More multiplayer games (Ludo, etc.)
- Voice chat
- Game invitations

## Troubleshooting

### Connection Issues:
1. Check if backend server is running
2. Verify CORS settings match frontend URL
3. Check browser console for errors
4. Ensure `VITE_API_BASE_URL` is set correctly

### Game Not Updating:
1. Check socket connection status in navbar
2. Verify you're in the correct room
3. Check browser console for socket errors

### Room Not Found:
- Ensure room ID is correct
- Room expires when all players leave
- Create a new room if needed

