// Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  userId: mongoose.Schema.Types.ObjectId,
  image: String,
});

const Event = mongoose.model("Event", eventSchema);

export default Event; // Экспортируем как default
