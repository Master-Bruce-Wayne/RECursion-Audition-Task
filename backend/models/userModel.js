import mongoose, { mongo } from "mongoose";

const userModel = new mongoose.Schema({
    fullName: { 
        type:String, required:true,
    },
    username: {
        type:String, required:true,
    },
    email: {
        type:String, required:true,
    },
    password: { 
        type:String, required:true 
    },
    profilePhoto: { 
        type:String, default:"" 
    },
    gender: { 
        type:String, enum:["male","female"], required:true
    },
    score: {
        type:Number, required:true, default:0
    }
}, {timestamps: true });

export const User=mongoose.model("User", userModel);
