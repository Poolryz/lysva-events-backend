import express from "express";
import { getEvents, createEvent } from "../controllers/eventsController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { upload } from "../config/multerConfig.js";


const eventsRouter = express.Router();

eventsRouter.get("/", getEvents);
eventsRouter.post('/', authenticateToken, upload.single("image"), createEvent);

export default eventsRouter;
