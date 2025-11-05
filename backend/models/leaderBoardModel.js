import mongoose from "mongoose";

const leaderboardModel = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    score: { type: Number, default: 0 },
    matchesPlayed: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    lastPlayed: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ensure each player has one record per game
leaderboardModel.index({ player: 1, game: 1 }, { unique: true });

export default LeaderBoard = mongoose.model("Leaderboard", leaderboardModel);
