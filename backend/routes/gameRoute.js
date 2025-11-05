import express from 'express';
import { createGame, getAllGames } from '../controllers/gameController.js';

// completely working 
const router=express.Router();

router.route("/addGame").post(createGame);
router.route("/").get(getAllGames);

export default router;