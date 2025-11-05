// const express  = require('express') 
import express from 'express'
import dotenv from "dotenv"
import connectDB from './config/database.js';
import cookieParser from 'cookie-parser';
// routes
import userRouter from './routes/userRoute.js'
import gameRouter from './routes/gameRoute.js'
dotenv.config({});

const app=express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/game', gameRouter);

app.get('/', (req,res) => {
    return res.send("Kaam kar raha hai");
});

// connect db first then start server
const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, "0.0.0.0",() => {
            console.log(` Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error(" MongoDB connection failed:", error)
        process.exit(1)
    }
}

startServer()