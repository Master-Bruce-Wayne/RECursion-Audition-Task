// const express  = require('express') 
import express from 'express'
import dotenv from "dotenv"
import connectDB from './config/database.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
// routes
import userRouter from './routes/userRoute.js'
import gameRouter from './routes/gameRoute.js'
import leaderBoardRouter from './routes/leaderBoardRoute.js';
import { setupSocketIO } from './socket/socketHandler.js';

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;

// Create HTTP server
const httpServer = createServer(app);

setupSocketIO(httpServer);

app.use(cors({
    // origin: process.env.FRONTEND_URL,
    origin: "http://localhost:5173",
    credentials:true  // allows cookies
}));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/game', gameRouter);
app.use('/api/v1/stats', leaderBoardRouter);

app.get('/', (req,res) => {
    return res.send("Kaam kar raha hai");
});

// connect db first then start server
const startServer = async () => {
    try {
        await connectDB()
        httpServer.listen(PORT, "0.0.0.0",() => {
            console.log(` Server running on port ${PORT}`)
            console.log(` Socket.IO server ready`)
        })
    } catch (error) {
        console.error(" MongoDB connection failed:", error)
        process.exit(1)
    }
}

startServer()
