import mongoose from 'mongoose'

const gameModel = new mongoose.Schema({
    name: { 
        type: String, required: true 
    },
    code: {     // e.g. CONNECT4
        type: String, required: true, unique: true 
    }, 
    description: { 
        type: String 
    },
    tags: [{     // ["board", "strategy"]
        type: String 
    }], 
    thumbnail: {    // optional image url
        type: String 
    }, 
  }, { timestamps: true }
);

export const Game = mongoose.model("Game",gameModel);