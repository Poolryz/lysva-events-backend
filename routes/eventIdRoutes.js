import express from "express";
import { getEventId, putEventId, deleteEventId } from "../controllers/eventIdController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { upload } from "../config/multerConfig.js";

const eventIdRouters = express.Router();

eventIdRouters.get("/:id", getEventId);
eventIdRouters.put("/:id", authenticateToken, upload.single("image"), putEventId); // Добавлен middleware upload
eventIdRouters.delete("/:id", authenticateToken, deleteEventId);

export default eventIdRouters;
