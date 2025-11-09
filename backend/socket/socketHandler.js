import { Server } from 'socket.io';

export const setupSocketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:5173",
            credentials: true,
            methods: ["GET", "POST"]
        },
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("join_room", (roomCode) => {
            socket.join(roomCode);
            console.log(` User ${socket.id} joined room: ${roomCode}`);
            io.to(roomCode).emit("player_joined", { playerId: socket.id });
        });

        socket.on("player_move", (data) => {
            // data = { roomCode, moveData }
            console.log(`Move received in ${data.roomCode}:`, data.moveData);
            io.to(data.roomCode).emit("receive_move", data);
        });

        socket.on("send_message", (data) => {
            // data = { roomCode, message, player }
            io.to(data.roomCode).emit("receive_message", data);
        });

        socket.on("game_over", (data) => {
            // data = { roomCode, winner, stats }
            io.to(data.roomCode).emit("game_result", data);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    console.log("Socket.IO server is running and initialised");
    return io;
};

