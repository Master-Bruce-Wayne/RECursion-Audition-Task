// import {io} from 

export const setupSocketIO = (io) => {
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Join a game room
        socket.on('join_game', ({ roomId }) => {
            socket.join(roomId);
        })
    })
}