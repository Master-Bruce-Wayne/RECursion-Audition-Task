import express from "express"
import { login, logout, register } from "../controllers/userController.js";

const router = express.Router();

// fully working route 
// register -> login || logout
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;