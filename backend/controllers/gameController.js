import { Game } from '../models/gameModel.js'

// working complete 
export const createGame = async (req, res) => {
    try {
        const { name, code, description, tags, thumbnail } = req.body;
        if(!name || !code || !tags) {
            return res.status(400).json({message:"All fields are required"});
        }

        const game = await Game.findOne({code});
        if(game) {
            return res.status(400).json({message:"Game already exists!"});
        }

        await Game.create({ name, code, description, tags, thumbnail });
        return res.status(201).json({
            message:"Game created successfully.",
            success:true
        });
    } catch (err) {
        console.log(err);
        // res.status(500).json({ message: err.message });
    }
};

// working complete
export const getAllGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json(games);
    } catch (err) {
        console.log(err);
        // res.status(500).json({ message: err.message });
    }
};