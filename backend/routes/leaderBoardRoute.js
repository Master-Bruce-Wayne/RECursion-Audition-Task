import express from 'express'
import { getGameStats, getGlobalStats, updateStats } from '../controllers/leaderBoardController.js';

const router = express.Router();

router.route("/update").post(updateStats);
router.route("/global").get(getGlobalStats);
router.route("/game/:gameCode").get(getGameStats);

export default router;