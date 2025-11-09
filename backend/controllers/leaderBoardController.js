import { LeaderBoard } from "../models/leaderBoardModel.js";

export const updateStats = async(req,res) => {
    const { player, game, score, win } = req.body;
    if(!player || !game || !score) {
        return res.status(400).json({message:"All fields are required"});
    };

    let statSec = await LeaderBoard.findOne({player,game});
    if(!statSec)  {
        statSec = await LeaderBoard.create({
            player, game, score:0, matchesPlayed:0, wins:0, losses:0
        });
    }

    statSec.score+=score;
    statSec.matchesPlayed++;
    win ? statSec.wins++ : statSec.losses++;

    await statSec.save(); // ✅ important to persist updates

    return res.status(201).json({
        message: "Score updated successfully!",
        success: true,
        data: statSec,
    });
}

export const getGlobalStats = async(req,res) => {
    try {
        const stats = await LeaderBoard.aggregate([
            {
              $group: {
                _id: "$player", // group by player
                totalScore: { $sum: "$score" },
                totalWins: { $sum: "$wins" },
                totalLosses: { $sum: "$losses" },
                totalMatches: { $sum: "$matchesPlayed" },
                gamesPlayed: { $addToSet: "$game" },
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "playerInfo",
              },
            },
            {
              $unwind: "$playerInfo",
            },
            {
              $project: {
                _id: 0,
                playerId: "$_id",
                username: "$playerInfo.username",
                totalScore: 1,
                totalWins: 1,
                totalLosses: 1,
                totalMatches: 1,
                gamesPlayed: 1,
              },
            },
            { $sort: { totalScore: -1 } },   // descending order
        ]);

        return res.status(200).json({
            success:true, data:stats
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error fetching player stats" });
    }

}

export const getGameStats = async(req,res) => {
    try{
        const { gameCode } = req.params;
        const gameStats = await LeaderBoard.find({game:gameCode})
        .populate("player", "username")
        .populate("game", "name code")
        .sort({score: -1})
        .limit(10);  // top 10 players

        return res.status(200).json({
            success:true, data:gameStats
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error fetching game stats" });
    }
}