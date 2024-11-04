import express from "express";
import { login, getinfo } from "../controllers/loginController.js";
import {authenticateToken} from "../middlewares/authMiddleware.js"
const loginRoutes = express.Router();

loginRoutes.post("/login", login);
loginRoutes.get("/login", authenticateToken, getinfo);

export default loginRoutes;
