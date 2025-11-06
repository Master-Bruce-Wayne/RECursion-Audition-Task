import { LeaderBoard } from "../models/leaderBoardModel.js";

export const updateStats = async(req,res) => {
    const { player, game, score, matchesPlayed, wins,losses, lastPlayed } = req.body;
    if(!player || !game || !score || !matchesPlayed || !wins || !losses || !lastPlayed) {
        return res.status(400).json({message:"All fields are required"});
    };

    let statSec = await LeaderBoard.findOne({player,game});
    if(!statSec)  {
        statSec = await LeaderBoard.create({
            player, game
        });
    }

    statSec.score+=score;
    statSec.matchesPlayed+=matchesPlayed;
    statSec.wins+=wins; statSec.losses+=losses;

    return res.status(201).json({
        message:"Score updated succesfully!",
        success:true
    })
}

export const getGlobalStats = async(req,res) => {
    try {

    } catch(err) {
        console.log(err);
    }

}